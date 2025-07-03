https://www.kaggle.com/datasets/pr1m3r/minecraft-dimensions-screenshots


# Minecraft Biome Guesser

In this project, I developed a Minecraft Biome Guesser web app that allows users to identify biomes from blurred images in a quiz format. I implemented score tracking, leaderboard integration, and backend communication using React (with Tailwind CSS) for the frontend and Django for the backend API.
<br>

## 💡 What it does
- Users take a quiz to identify Minecraft biome images
- Each question presents a blurred screenshot and 4 options
- Correct answers earn points, and scores are submitted to a leaderboard
- Final results and accuracy are tracked and displayed
<br>

## 🛠️ Tech Stacks
- **Frontend**: `React`, `TailwindCSS`
- **Backend**: `Django`
<br>

## ✨ Website Design
![Example](https://raw.githubusercontent.com/SudevOP1/MinecraftBiomeGuesser/main/Implementation.png)<br>
<br>

## 🚀 How to run it locally

### 1. Clone the repo
```bash
git clone https://github.com/SudevOP1/MinecraftBiomeGuesser.git
```
### 2. Backend Server
```powershell
cd MinecraftBiomeGuesser/apps/backend
pip install -r packages.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```
### 3. Frontend Server
```powershell
cd MinecraftBiomeGuesser/apps/frontend
npm run dev
```
### 4. See the magic happen
Open `http://localhost:5173/` in your browser<br>