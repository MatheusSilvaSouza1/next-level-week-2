import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('classes', table => {
        table.increments('id').primary()
        table.string('subject').notNullable()
        table.decimal('cost').notNullable()

        table.integer('user_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE') //! se o id do usuario mudar na tabela users o id na tabela classes tbm muda automaticamente
        .onDelete('CASCADE') //! se o usuario for deletado na tabela users os registros vinculados a ele tbm serao deletados na tabela classes
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('classes')
}