import { db } from "../database/connection"
import { Request, Response } from 'express'
import ConvertHourToMinutes from "../utils/convertHourToMinutes"

interface IScheduleItem {
    week_day: number
    from: string
    to: string
}

export default class ClassesController {

    async index(request: Request, response: Response) {
        const filters = request.query

        const subject = filters.subject as string
        const week_day = filters.week_day as string
        const time = filters.time as string

        if (!filters.week_day || !filters.subject || !filters.time) {
            return response.status(400).json({
                error: 'missing filters to search classes'
            })
        }

        const timeInMinutes = ConvertHourToMinutes(time)

        const classes = await db('classes')
        .whereExists(function(){
            this.select('class_schedule.*')
                .from('class_schedule')
                .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                .whereRaw('`class_schedule`.`week_day` = ??',[Number(week_day)])
                .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
        })
        .where('classes.subject', '=', subject)
        .join('users', 'classes.user_id', '=', 'users.id')
        .select('classes.*', 'users.*')

        response.json(classes)
    }


    async create(request: Request, response: Response) {

        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = request.body

        const trx = await db.transaction() //! caso algo de errado em alguma insercao esse comando é capaz de dar um rollback
        try {

            const insertedUsersIds = await trx('users').insert({
                name,
                avatar,
                whatsapp,
                bio
            })

            const user_id = insertedUsersIds[0]

            const insertedClassesIds = await trx('classes').insert({
                subject,
                cost,
                user_id
            })

            const class_id = insertedClassesIds[0]

            const classSchedule = schedule.map((schedule: IScheduleItem) => {
                return {
                    class_id,
                    week_day: schedule.week_day,
                    from: ConvertHourToMinutes(schedule.from),
                    to: ConvertHourToMinutes(schedule.to)
                }
            })

            await trx('class_schedule').insert(classSchedule)

            await trx.commit()

            return response.status(201).send()
        } catch (err) {
            await trx.rollback()

            return response.status(400).json({
                error: "Erro inesperado em quanto a aula era criada"
            }).send()
        }
    }
} 