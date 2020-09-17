import React, { useState, FormEvent } from 'react'


import './styles.css'
import PageHeader from '../../components/pageHeader'
import TeacherItem, {ITeacher} from '../../components/TeacherItem'
import Input from '../../components/input'
import Select from '../../components/Select'
import { api } from '../../services/api'


function TeacherList() {

    const [teachers, setTeachers] = useState([]) 

    const [subject, setSubject] = useState('')
    const [week_day, setWeek_day] = useState('')
    const [time, setTime] = useState('')



    async function searchTeacher(e: FormEvent){
        e.preventDefault()

        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time
            }
        })
        setTeachers(response.data)
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponiveis">

                <form id="search-teachers" onSubmit={searchTeacher}>

                    <Select
                        name="subject"
                        label="Máteria"
                        value={subject}
                        onChange={(e) => { setSubject(e.target.value) }}
                        options={[
                            { value: 'Artes', label: 'Artes' },
                            { value: 'Biologia', label: 'Biologia' },
                            { value: 'Ciencias', label: 'Ciencias' },
                            { value: 'Fisica', label: 'Fisica' },
                            { value: 'Portugues', label: 'Portugues' },
                        ]}
                    />
                    <Select
                        name="week_day"
                        label="Dia da semana"
                        value={week_day}
                        onChange={(e) => { setWeek_day(e.target.value) }}
                        options={[
                            { value: '0', label: 'Domingo' },
                            { value: '1', label: 'Segunda-feira' },
                            { value: '2', label: 'Terça-feira' },
                            { value: '3', label: 'Quarta-feira' },
                            { value: '4', label: 'Quita-feira' },
                            { value: '5', label: 'Sexta-feira' },
                            { value: '6', label: 'Sábado' },
                        ]}
                    />

                    <Input
                        type="time"
                        name="time"
                        value={time}
                        onChange={(e) => { setTime(e.target.value) }}
                        label="Hora"
                    />

                        <button type='submit'>
                            Buscar
                        </button>

                </form>

            </PageHeader>

            <main>
                {teachers.map((teacher: ITeacher) =>{
                    return <TeacherItem key={teacher.id} teacher={teacher} />
                })}

            </main>
        </div>
    )
}

export default TeacherList