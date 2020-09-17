import React, { useState } from 'react'
import { View, ScrollView, Text, TextInput } from 'react-native'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import asyncStorage from '@react-native-community/async-storage'

import styles from './styles'
import PageHeader from '../../components/PageHeader'
import TeacherItem, { ITeacher } from '../../components/TeacherItem'
import api from '../../services/api'
import { useFocusEffect } from '@react-navigation/native'


function TeacherList() {

    const [teachers, setTeachers] = useState([])
    const [favorites, setFavorites] = useState<Number[]>([])
    const [isFiltersVisible, setIsFiltersVisible] = useState(false)
    const [subject, setSubject] = useState('')
    const [week_day, setWeek_day] = useState('')
    const [time, setTime] = useState('')

    function loadFavorites(){
        asyncStorage.getItem('favorites').then(response => {
            if (response) {
                const favoritedTeaches = JSON.parse(response)
                const favoritedTeachesIds = favoritedTeaches.map((teacher: ITeacher) => {
                    return teacher.id
                })
                setFavorites(favoritedTeachesIds)
            }
        })
    }

    useFocusEffect(() => {
        loadFavorites()
    })
    
    function handleToggleFiltersVisible() {
        setIsFiltersVisible(!isFiltersVisible)
    }

    async function handleFiltersSubmit() {
        loadFavorites()
        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time
            }
        })
        setIsFiltersVisible(false)
        setTeachers(response.data)
    }

    return (
        <View style={styles.container} >
            <PageHeader
                title="Proffys disponiveis"
                headerRight={(
                    <BorderlessButton onPress={handleToggleFiltersVisible}>
                        <Feather name="filter" size={20} color="#FFF" />
                    </BorderlessButton>
                )}
            >
                {isFiltersVisible && (

                    <View style={styles.searchForm}>
                        <Text style={styles.label}>Matéria</Text>
                        <TextInput
                            style={styles.input}
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            placeholder='Qual a matéria?'
                            placeholderTextColor="#c1bccc"
                        />

                        <View style={styles.inputGroup} >
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da semana</Text>
                                <TextInput
                                    style={styles.input}
                                    value={week_day}
                                    onChangeText={text => setWeek_day(text)}
                                    placeholder='Qual o dia?'
                                    placeholderTextColor="#c1bccc"
                                />
                            </View>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>
                                <TextInput
                                    style={styles.input}
                                    value={time}
                                    onChangeText={text => setTime(text)}
                                    placeholder='Qual o horário??'
                                    placeholderTextColor="#c1bccc"
                                />
                            </View>
                        </View>
                        <RectButton style={styles.submitButton} onPress={handleFiltersSubmit}>
                            <Text style={styles.submitButtonText}>Filtrar</Text>
                        </RectButton>
                    </View>
                )}
            </PageHeader>

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >
                {teachers.map((teacher: ITeacher) => {
                    return (
                        <TeacherItem
                            key={teacher.id}
                            teacher={teacher}
                            favorited={favorites.includes(teacher.id)}
                        />
                    )
                })}
            </ScrollView>
        </View>

    )
}

export default TeacherList