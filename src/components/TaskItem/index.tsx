import { View, Text, TouchableOpacity } from 'react-native'
import Checkbox from 'expo-checkbox'
import { ITask } from '../../screens/Home'
import { Trash } from 'phosphor-react-native'
import { styles } from './styles'
import React from 'react'

interface Props {
  task: ITask
  setAsDone: (id: string) => void
  onDelete: (id: string) => void
}

export function TaskItem({ task, setAsDone, onDelete }: Props) {
  function handleSetTaskAsDone() {
    setAsDone(task.id)
  }

  function handleDeleteTask() {
    onDelete(task.id)
  }

  return (
    <View style={styles.container}>
      <Checkbox
        style={styles.checkbox}
        color={task.done ? '#5E60CE' : undefined}
        value={task.done}
        onValueChange={handleSetTaskAsDone}
      />
      <Text style={[styles.title, task.done && styles.done]}>{task.title}</Text>
      <TouchableOpacity activeOpacity={0.7} onPress={handleDeleteTask}>
        <Trash color="#808080" />
      </TouchableOpacity>
    </View>
  )
}
