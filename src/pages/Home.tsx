import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  FlatList,
} from "react-native";

import { Button } from "../components/Button";
import { SkillCard } from "../components/SkillCard";

interface ISkillData {
  id: string;
  name: string;
}

export function Home() {
  const [newSkill, setNewSkill] = useState("");
  const [mySkills, setMySkills] = useState<ISkillData[]>([]);
  const [greeting, setGreeting] = useState("");

  function handleAddNewSkill() {
    const data = {
      id: String(new Date().getTime()),
      name: newSkill,
    };

    setNewSkill("");
    setMySkills((oldState) => [...oldState, data]);
  }

  function handleRemoveSkill(id: string) {
    setMySkills((oldState) => oldState.filter((skill) => skill.id !== id));
  }

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      setGreeting("Good morning");
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good night");
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, Rioja</Text>
      <Text style={styles.greetings}>{greeting}</Text>

      <TextInput
        value={newSkill}
        testID="input-new"
        style={styles.input}
        placeholder="New skill"
        onChangeText={setNewSkill}
        placeholderTextColor="#555"
      />

      <Button testID="button-add" title="Add" onPress={handleAddNewSkill} />

      <Text style={[styles.title, { marginVertical: 50 }]}>My Skills</Text>

      {mySkills && (
        <FlatList
          testID="flat-list-skills"
          data={mySkills}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          keyboardShouldPersistTaps="never"
          renderItem={({ item }) => (
            <SkillCard
              skill={item.name}
              onPress={() => handleRemoveSkill(item.id)}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121015",
    paddingVertical: 70,
    paddingHorizontal: 30,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  input: {
    fontSize: 18,
    marginTop: 30,
    borderRadius: 7,
    color: "#fff",
    backgroundColor: "#1f1e25",
    padding: Platform.OS === "ios" ? 15 : 10,
  },
  greetings: {
    color: "#fff",
  },
});
