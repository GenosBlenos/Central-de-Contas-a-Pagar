import json
import os
from datetime import datetime
from typing import Dict, List, Optional, TypedDict

class Conta(TypedDict):
    id: int
    nome: str
    valor: float
    vencimento: str  # ISO format (YYYY-MM-DD)
    paga: bool

class FileManager:
    @staticmethod
    def read_json(file_path: str) -> List[Conta]:
        """Safely read JSON data from file"""
        if not os.path.exists(file_path):
            return []
        
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                return json.load(file)
        except (json.JSONDecodeError, UnicodeDecodeError):
            FileManager.backup_corrupted_file(file_path)
            return []

    @staticmethod
    def write_json(file_path: str, data: List[Conta]) -> None:
        """Atomic write to JSON file with backup"""
        backup_file = f"{file_path}.bak"
        temp_file = f"{file_path}.tmp"

        # Create backup
        if os.path.exists(file_path):
            os.replace(file_path, backup_file)

        # Write to temp file
        with open(temp_file, 'w', encoding='utf-8') as file:
            json.dump(data, file, indent=2, ensure_ascii=False)

        # Replace original file
        os.replace(temp_file, file_path)

    @staticmethod
    def backup_corrupted_file(file_path: str) -> None:
        """Handle corrupted files by creating emergency backup"""
        corrupted_backup = f"{file_path}.corrupted_{datetime.now().timestamp()}"
        if os.path.exists(file_path):
            os.rename(file_path, corrupted_backup)

class ContasAPagar:
    def __init__(self, data_file: str = 'contas.json'):
        self.data_file = data_file
        self.contas: List[Conta] = FileManager.read_json(data_file)

    def _get_next_id(self) -> int:
        return max((conta['id'] for conta in self.contas), default=0) + 1

    def _save_data(self) -> None:
        FileManager.write_json(self.data_file, self.contas)

    def adicionar_conta(self, nome: str, valor: float, vencimento: str) -> None:
        """Add new bill with validation"""
        try:
            # Validate date format
            datetime.fromisoformat(vencimento)
            
            new_conta: Conta = {
                'id': self._get_next_id(),
                'nome': nome.strip(),
                'valor': round(float(valor), 2),
                'vencimento': vencimento,
                'paga': False
            }
            
            self.contas.append(new_conta)
            self._save_data()
            print("Conta adicionada com sucesso!")
        except (ValueError, TypeError) as e:
            print(f"Erro na validação dos dados: {e}")

    def marcar_como_paga(self, conta_id: int) -> None:
        """Mark bill as paid with confirmation"""
        for conta in self.contas:
            if conta['id'] == conta_id:
                if not conta['paga']:
                    conta['paga'] = True
                    self._save_data()
                    print(f"Conta ID {conta_id} marcada como paga.")
                else:
                    print("Esta conta já está paga.")
                return
        print(f"Conta ID {conta_id} não encontrada.")

    def listar_contas(self, filtro: Optional[str] = None) -> None:
        """List bills with formatted output"""
        headers = ["ID", "Nome", "Valor", "Vencimento", "Status"]
        rows = []

        for conta in self.contas:
            status = "Paga" if conta['paga'] else "Pendente"
            if filtro == 'pagas' and not conta['paga']:
                continue
            if filtro == 'pendentes' and conta['paga']:
                continue
            
            rows.append([
                str(conta['id']),
                conta['nome'],
                f"R$ {conta['valor']:.2f}",
                conta['vencimento'],
                status
            ])

        # Formatting output
        if not rows:
            print("Nenhuma conta encontrada.")
            return

        col_widths = [max(len(str(item)) for item in column] for column in zip(headers, *rows)]
        
        # Print header
        header = " | ".join(h.ljust(w) for h, w in zip(headers, col_widths))
        print(header)
        print("-" * len(header))

        # Print rows
        for row in rows:
            print(" | ".join(item.ljust(w) for item, w in zip(row, col_widths)))

    def deletar_conta(self, conta_id: int) -> None:
        """Delete bill with confirmation"""
        original_count = len(self.contas)
        self.contas = [conta for conta in self.contas if conta['id'] != conta_id]
        
        if len(self.contas) < original_count:
            self._save_data()
            print(f"Conta ID {conta_id} deletada com sucesso.")
        else:
            print(f"Conta ID {conta_id} não encontrada.")

def get_valid_input(prompt: str, validator) -> str:
    """Generic input validation function"""
    while True:
        value = input(prompt).strip()
        try:
            if validator(value):
                return value
        except Exception as e:
            print(f"Entrada inválida: {e}")

def validate_date(date_str: str) -> bool:
    try:
        datetime.fromisoformat(date_str)
        return True
    except ValueError:
        raise ValueError("Formato de data inválido. Use YYYY-MM-DD")

def validate_float(value: str) -> bool:
    try:
        float(value)
        return True
    except ValueError:
        raise ValueError("Valor deve ser um número")

def main():
    sistema = ContasAPagar()
    
    menu = """
    === GERENCIADOR DE CONTAS A PAGAR ===
    1. Adicionar nova conta
    2. Marcar conta como paga
    3. Listar todas as contas
    4. Listar contas pendentes
    5. Listar contas pagas
    6. Excluir conta
    7. Sair
    """
    
    while True:
        print(menu)
        escolha = get_valid_input("Escolha uma opção: ", lambda x: x in {'1','2','3','4','5','6','7'})
        
        if escolha == '1':
            nome = get_valid_input("Nome da conta: ", lambda x: len(x) >= 2)
            valor = get_valid_input("Valor: R$ ", validate_float)
            vencimento = get_valid_input("Vencimento (YYYY-MM-DD): ", validate_date)
            sistema.adicionar_conta(nome, valor, vencimento)
        
        elif escolha == '2':
            conta_id = int(get_valid_input("ID da conta a marcar como paga: ", lambda x: x.isdigit()))
            sistema.marcar_como_paga(conta_id)
        
        elif escolha in {'3','4','5'}:
            filtro = {
                '3': None,
                '4': 'pendentes',
                '5': 'pagas'
            }[escolha]
            sistema.listar_contas(filtro)
        
        elif escolha == '6':
            conta_id = int(get_valid_input("ID da conta a excluir: ", lambda x: x.isdigit()))
            confirm = input(f"Tem certeza que deseja excluir a conta ID {conta_id}? (S/N): ").lower()
            if confirm == 's':
                sistema.deletar_conta(conta_id)
        
        elif escolha == '7':
            print("Saindo do sistema...")
            break

        input("\nPressione Enter para continuar...")

if __name__ == "__main__":
    main()