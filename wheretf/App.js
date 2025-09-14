import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Animated, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

const COLORS = {
  burntOrange: '#CC5500',
  cyan: '#00FFFF',
  deepTeal: '#014F86'
};

const NOISE = 'iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAAAAACo4kLRAAABr0lEQVR4nAGkAVv+APMECW4hyVkLyihGp6TaP//uu25EAPNITPyjcXv4ppTSUfMN3Bl7GY9gAijqYhDH1Bv/zkaKPYPR0kuMZ0++BEcUI//mz3E8sDf/BUCzkXcYq2SiAGTVByj7X6AAC+/nQTlJZvtrbl66ACOzHR05Cv2B3MVYUjHjJm0QtI0yAGrfnNsfZoYayqBnno9ZxwGc/PN2BCGLoDxBz2+O14b4DyIhMtQW+H2yAdAKuSmbPi2gsSWQ6lvfUhhVnnjsAAuspekU6YXIN9TumOHIPefU9jjMABb/bM2kYPDKpLDc/YtDiFr0MrRiAck0i58r7xYN9zo+y35K/Xa/9X/FAr2lLsyMFI67ltZBH9gD027lIXd2AvU8KYz6hvsPOcBbo1BI8Lsn7dGBAt84Fymr4nQm3yCdEvwp3pimg+4iAP1ozNXnkGXWAvhMxmKW+9M+8NM0AFQwCEDTrpTYmzcAJ2L2kX75qhUEAMulMlpG5NdXC+avadRL2ILi55L3ABQnntnNGFkujw7TMHcjOH85qU8JAJq0GjgFVwnTdcVMgl5MEq0ArOx8VWrMyeM4MDAAAAAASUVORK5CYII=';

export default function App() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [query, setQuery] = useState('');

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }).start();
  }, []);

  const items = [
    { name: 'Keys', icon: '🔑' },
    { name: 'Wallet', icon: '👛' },
    { name: 'Phone', icon: '📱' },
    { name: 'Vape', icon: '💨' }
  ];

  return (
    <LinearGradient colors={[COLORS.burntOrange, COLORS.cyan, COLORS.deepTeal]} style={styles.container}>
      <Image source={{ uri: `data:image/png;base64,${NOISE}` }} style={StyleSheet.absoluteFill} resizeMode="repeat" />
      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>WhereTF did I leave…</Text>
          <BlurView intensity={50} tint="light" style={styles.searchBox}>
            <TextInput
              style={styles.input}
              placeholder="Type or tap an item..."
              placeholderTextColor="rgba(255,255,255,0.6)"
              value={query}
              onChangeText={setQuery}
            />
          </BlurView>

          <View style={styles.grid}>
            {items.map((item) => (
              <BlurView key={item.name} intensity={30} tint="light" style={styles.card}>
                <Text style={styles.icon}>{item.icon}</Text>
                <Text style={styles.label}>{item.name}</Text>
              </BlurView>
            ))}
            <TouchableOpacity>
              <BlurView intensity={30} tint="light" style={styles.addCard}>
                <Text style={styles.add}>+</Text>
              </BlurView>
            </TouchableOpacity>
          </View>

          <BlurView intensity={40} tint="light" style={styles.questionBox}>
            <Text style={styles.questionTitle}>LET'S FIGURE THIS OUT.</Text>
            <Text style={styles.question}>Is it in your house?</Text>
            <View style={styles.buttons}>
              <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Yes</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>No</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Not Sure</Text></TouchableOpacity>
            </View>
          </BlurView>
        </ScrollView>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, paddingTop: 60 },
  title: { fontSize: 26, fontWeight: '700', color: '#fff', marginBottom: 20 },
  searchBox: { borderRadius: 12, overflow: 'hidden', marginBottom: 20 },
  input: { padding: 12, color: '#fff' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 20 },
  card: { width: '48%', height: 100, borderRadius: 20, marginBottom: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.1)' },
  addCard: { width: '48%', height: 100, borderRadius: 20, marginBottom: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.1)' },
  icon: { fontSize: 32 },
  label: { marginTop: 8, color: '#fff', fontWeight: '600' },
  add: { fontSize: 40, color: '#fff' },
  questionBox: { borderRadius: 20, padding: 20, backgroundColor: 'rgba(255,255,255,0.15)' },
  questionTitle: { color: '#fff', fontWeight: '700', marginBottom: 10, textAlign: 'center', letterSpacing: 1 },
  question: { color: '#fff', fontSize: 16, marginBottom: 15, textAlign: 'center' },
  buttons: { flexDirection: 'row', justifyContent: 'space-between' },
  button: { flex: 1, marginHorizontal: 5, paddingVertical: 10, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.25)' },
  buttonText: { textAlign: 'center', color: '#fff', fontWeight: '600' }
});
