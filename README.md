# 📊 GitHub Analytics Dashboard

A powerful dashboard to visualize and analyze your GitHub activity, repositories, and contributions.

![Dashboard Preview](https://via.placeholder.com/800x300/0d1117/58a6ff?text=GitHub+Analytics)

## ✨ Features

- 📈 Contribution graph analysis
- 📊 Repository statistics
- 👥 Follower/following trends
- 🏆 Language breakdown
- 🔥 Activity heatmap
- 📅 Commit history timeline
- 📋 Issue & PR tracking

## 🛠️ Tech Stack

- TypeScript
- React
- Chart.js
- GitHub REST API
- Tailwind CSS

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/4harmony55-glitch/github-analytic-dashboard.git

# Install dependencies
npm install

# Create .env file
echo "VITE_GITHUB_TOKEN=your_token" > .env

# Run development server
npm run dev
```

## 🔑 Environment Variables

```env
VITE_GITHUB_TOKEN=your_github_personal_access_token
```

## 📋 API Endpoints Used

- `/user` - Get user info
- `/user/repos` - List repositories
- `/user/events` - Activity events
- `/user/contributions` - Contribution data

## 📄 License

MIT
