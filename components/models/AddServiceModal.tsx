import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

interface AddItemModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (service: any) => void;
}

const AddServiceModal: React.FC<AddItemModalProps> = ({ visible, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');

  const handleSave = () => {
    // Basic validation
    if (name && price) {
      onSave({ name, type, price, id: Math.random().toString() });
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.overlay}
      >
        <View style={styles.modalSheet}>
          {/* Handle bar for visual indicator */}
          <View style={styles.handle} />
          
          <Text style={styles.title}>Add New Service</Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>SERVICE NAME</Text>
              <TextInput 
                style={styles.input} 
                placeholder="e.g. Deep Cleaning"
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>CATEGORY / TYPE</Text>
              <TextInput 
                style={styles.input} 
                placeholder="e.g. Premium"
                value={type}
                onChangeText={setType}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>PRICE</Text>
              <TextInput 
                style={styles.input} 
                placeholder="$0.00"
                keyboardType="numeric"
                value={price}
                onChangeText={setPrice}
              />
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Create Service</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    maxHeight: '80%',
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: '#EEE',
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#111',
    marginBottom: 25,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#AAA',
    marginBottom: 8,
    letterSpacing: 1,
  },
  input: {
    backgroundColor: '#F7F8FA',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 10,
    marginBottom: 30,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 15,
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
  },
  cancelButtonText: {
    color: '#666',
    fontWeight: '700',
    fontSize: 16,
  },
  saveButton: {
    flex: 2,
    paddingVertical: 16,
    borderRadius: 15,
    alignItems: 'center',
    backgroundColor: '#5D5FEF', // Match your theme color
  },
  saveButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default AddServiceModal;