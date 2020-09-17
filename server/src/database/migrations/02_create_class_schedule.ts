import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('class_schedule', table => {
        table.increments('id').primary()

        table.integer('week_day').notNullable()
        table.integer('from').notNullable()
        table.integer('to').notNullable()

        table.integer('class_id')
            .notNullable()
            .references('id')
            .inTable('classes')
            .onUpdate('CASCADE') //! se o id do usuario mudar na tabela users o id na tabela classes tbm muda automaticamente
            .onDelete('CASCADE') //! se o usuario for deletado na tabela users os registros vinculados a ele tbm serao deletados na tabela classes
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('class_schedule')
}