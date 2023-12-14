import React, { useState } from 'react'
import {
  View,
  SafeAreaView,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native'
import { ClipboardText, PlusCircle } from 'phosphor-react-native'
import { styles } from './styles'
import { TaskItem } from '../../components/TaskItem'

export interface ITask {
  id: string
  title: string
  done: boolean
  createdAt: Date
}

export function Home() {
  const [tasks, setTasks] = useState<ITask[]>([])
  const [taskText, setTaskText] = useState('')

  const totalCreated = tasks.length
  const totalCompleted = tasks.filter((task) => task.done === true).length

  function handleCreateNewTask() {
    if (taskText === '') {
      return false
    }

    setTasks((prevState) => [
      ...prevState,
      {
        id: String(new Date()),
        title: taskText,
        done: false,
        createdAt: new Date(),
      },
    ])
    setTaskText('')
  }

  function setTaskAsDone(id: string) {
    const tasksWithoutDone = tasks.filter((task) => task.id !== id)
    const task = tasks.find((task) => task.id === id)
    if (task) {
      task.done = !task.done

      const newTasks = [...tasksWithoutDone, task]
      newTasks.sort((a, b) => {
        return Number(a.createdAt) - Number(b.createdAt)
      })

      setTasks(newTasks)
    }
  }

  function deleteTask(id: string) {
    Alert.alert(
      'Remover tarefa',
      'Deseja remover essa tarefa?',
      [
        {
          text: 'Sim',
          onPress: () => {
            const tasksWithoutDeleted = tasks.filter((task) => task.id !== id)
            setTasks(tasksWithoutDeleted)
          },
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
      },
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require('../../assets/logo.png')}
          alt="Logotipo Todo List"
        />
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Adicione uma nova tarefa"
            placeholderTextColor="#808080"
            value={taskText}
            onChangeText={setTaskText}
          />
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            onPress={handleCreateNewTask}
          >
            <PlusCircle color="#ffffff" size={24} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.tasks}>
        <View style={styles.infos}>
          <View style={styles.info}>
            <Text style={[styles.infoLabel, styles.infoLabelCreated]}>
              Criadas
            </Text>
            <Text style={styles.infoCounter}>{totalCreated}</Text>
          </View>
          <View style={styles.info}>
            <Text style={[styles.infoLabel, styles.infoLabelCompleted]}>
              Concluídas
            </Text>
            <Text style={styles.infoCounter}>{totalCompleted}</Text>
          </View>
        </View>

        <FlatList
          data={tasks}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              setAsDone={setTaskAsDone}
              onDelete={deleteTask}
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyList}>
              <ClipboardText
                style={styles.emptyListIcon}
                color="#3D3D3D"
                size={56}
              />
              <Text style={styles.emptyListText}>
                Você ainda não tem tarefas cadastradas
                {'\n'}
                Crie tarefas e organize seus itens a fazer
              </Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  )
}
