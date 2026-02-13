import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  FlatList
} from 'react-native';
import RNFS from 'react-native-fs';
import FileViewer from "react-native-file-viewer";
import { useFocusEffect } from '@react-navigation/native';

const FileList = () => {

  const [files, setFiles] = useState([]);
  const contentPath = "/Downloadss";

const getFiles = async (path) => {
  try {
    const exists = await RNFS.exists(path);

    if (exists) {
      const fileList = await RNFS.readDir(path);

      // 🔥 Sort by modified time (Newest first)
      const sortedFiles = fileList.sort(
        (a, b) => new Date(b.mtime) - new Date(a.mtime)
      );

      setFiles(sortedFiles);
    } else {
      Alert.alert('Folder does not exist');
    }
  } catch (error) {
    Alert.alert('Error reading files', error.message);
  }
};


  const openFile = (path) => {
    FileViewer.open(path, {
      showAppsSuggestions: true,
      showOpenWithDialog: true
    }).catch((error) => {
      Alert.alert("Error while Opening file", error.message);
    });
  };

  const deleteFile = async (file) => {
    Alert.alert(
      "Delete File",
      `Are you sure you want to delete ${file.name}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await RNFS.unlink(file.path);
              setFiles(prev => prev.filter(f => f.path !== file.path));
            } catch (error) {
              Alert.alert("Error deleting file", error.message);
            }
          }
        }
      ]
    );
  };

  const handleClick = (file) => {
    Alert.alert("", file.name, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Open', onPress: () => openFile(file.path) }
    ]);
  };

  useFocusEffect(
    useCallback(() => {
      const path = `${RNFS.ExternalDirectoryPath}${contentPath}`;
      getFiles(path);
    }, [])
  );

  const renderItem = ({ item }) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 7,
        padding: 12,
        marginBottom: 15
      }}
    >
      {/* File Name */}
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => handleClick(item)}
      >
        <Text
          style={{
            color: "black",
            fontWeight: '500',
            fontSize: 16
          }}
          numberOfLines={1}
        >
          {item.name}
        </Text>
      </TouchableOpacity>

      {/* Delete Button */}
      <TouchableOpacity
        onPress={() => deleteFile(item)}
        style={{
          marginLeft: 10,
          paddingHorizontal: 10,
          paddingVertical: 6,
          backgroundColor: '#ff4d4d',
          borderRadius: 5
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          Delete
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={files}
      keyExtractor={(item) => item.path}
      renderItem={renderItem}
      contentContainerStyle={{
        paddingHorizontal: 20,
        paddingVertical: 10
      }}
      showsVerticalScrollIndicator={true}
    />
  );
};

export default FileList;
