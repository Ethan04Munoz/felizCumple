# 🎉 Happy Birthday App

Welcome to the Happy Birthday App! 🎂 This app lets you celebrate a birthday in an interactive and fun way. You can enter your age, blow out candles, and make a wish—all from your device!

## 📱 Features

1. **Welcome Screen**:
   - Asks for the user's age.
   - Interactive button enabled after entering a valid age.
   - Navigates to the next screen to start the celebration.
   - ![Main screen](./readme/welcome-screen.png)

2. **Birthday Celebration Screen**:
   - Displays a festive birthday message.
   - Features a cake with candles based on the entered age.
   - Allows candles to be blown out using microphone sound detection.
   - ![Birthday celebration screen](./readme/celebration-screen.png)
   - ![Birthday celebration screen after a few candles were blown out](./readme/celebration-screen-2.png)
3. **Wish Screen**:
   - Shows a personalized birthday wish message.
   - ![Wish screen](./readme/wish-screen.png)

## 🚀 How to Use

1. **Start**:
   - Enter your age on the welcome screen.
   - Press the "Celebrate" button to proceed.

2. **Celebrate**:
   - On the birthday screen, blow out the candles.
   - The microphone detects the sound and gradually extinguishes the candles.
   - Once all candles are blown out, you are automatically taken to the wish screen.

3. **Make a Wish**:
   - Enjoy your personalized birthday message and celebrate your special day.

## 🛠️ Technologies Used

- **React Native**: Core framework for building the app.
- **Expo**: Handles permissions and audio recording.
- **Componentization**: Reusable components such as the animated cake.

## 🎂 Technical Details

### **Welcome Screen**
- File: `Bienvenida.js`
- Allows the user to input their age and validates it as numeric.
- Navigates to `FelizCumple.js` upon button press.

### **Birthday Celebration Screen**
- File: `FelizCumple.js`
- Renders the cake component (`Cake.js`).
- Includes logic for blowing out candles based on sound detection.

### **Cake Component**
- File: `Cake.js`
- Displays candles corresponding to the entered age.
- Detects blowing sounds via the microphone and extinguishes candles progressively.
- Uses animations for the candle flames.

### **Wish Screen**
- File: `Deseo.js`
- Displays a celebratory message with a personalized birthday wish.

## 🚨 Required Permissions

- **Microphone**: To detect blowing sounds and extinguish candles. The app will request this permission when interacting with the candles.

## 🌟 Future Improvements

- Enhance the accuracy of sound detection.
- Add more animations and festive sounds.
- Allow personalized birthday messages.

---

- **Welcome Screen**: `./readme/welcome-screen.png`
- **Birthday Celebration Screen**: `./readme/celebration-screen.png`
- **Wish Screen**: `./readme/wish-screen.png`

Thank you for using the Happy Birthday App! 🎉