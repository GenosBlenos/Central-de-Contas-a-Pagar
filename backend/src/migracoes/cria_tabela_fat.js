export async function up(knex) {
  await knex.schema.createTable('faturas', (table) => {
    table.increments('id').primary();
    table.string('descricao').notNullable();
    table.decimal('valor', 15, 2).notNullable();
    table.date('vencimento').notNullable();
    table.enum('status', ['pendente', 'pago', 'atrasado']).defaultTo('pendente');
    table.timestamps(true, true);
  });
}

export async function down(knex) {
  await knex.schema.dropTable('faturas');
}