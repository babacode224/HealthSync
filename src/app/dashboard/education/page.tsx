"use client";

import { useState } from "react";

const articles = [
  { id: "EDU-001", title: "Managing Hypertension: A Complete Guide", category: "Heart Health", readTime: "8 min", author: "Dr. Adebayo Ogundimu", date: "2026-06-25", image: "🫀", featured: true, bookmarked: true, summary: "Learn practical strategies for managing high blood pressure through diet, exercise, medication adherence, and lifestyle changes tailored to the Nigerian context." },
  { id: "EDU-002", title: "Understanding Type 2 Diabetes", category: "Diabetes", readTime: "10 min", author: "Dr. Ngozi Eze", date: "2026-06-22", image: "🩸", featured: true, bookmarked: false, summary: "Everything you need to know about Type 2 diabetes — from understanding blood sugar levels to managing your condition with diet, exercise, and medication." },
  { id: "EDU-003", title: "Malaria Prevention: Protect Your Family", category: "Infectious Disease", readTime: "6 min", author: "HealthSync Medical Team", date: "2026-06-20", image: "🦟", featured: false, bookmarked: false, summary: "Comprehensive guide to malaria prevention including use of insecticide-treated nets, indoor spraying, and recognizing early symptoms for prompt treatment." },
  { id: "EDU-004", title: "Mental Health Matters: Recognizing Depression", category: "Mental Health", readTime: "7 min", author: "Dr. Funke Adeyemi", date: "2026-06-18", image: "🧠", featured: false, bookmarked: true, summary: "Breaking the stigma around mental health in Africa. Learn to recognize signs of depression and anxiety, and discover available support resources." },
  { id: "EDU-005", title: "Nutrition Guide: Eating Well on a Budget", category: "Nutrition", readTime: "5 min", author: "HealthSync Nutrition Team", date: "2026-06-15", image: "🥗", featured: false, bookmarked: false, summary: "Affordable, nutritious meal planning using locally available Nigerian foods. Includes weekly meal plans and recipes that support heart health and blood sugar control." },
  { id: "EDU-006", title: "Exercise for Busy Professionals", category: "Fitness", readTime: "4 min", author: "HealthSync Wellness Team", date: "2026-06-12", image: "🏃", featured: false, bookmarked: false, summary: "Simple, effective exercises you can do at home or in the office. 15-minute routines designed for busy schedules that improve cardiovascular health and reduce stress." },
  { id: "EDU-007", title: "Understanding Your Lab Results", category: "Lab Literacy", readTime: "9 min", author: "Dr. Adebayo Bakare", date: "2026-06-10", image: "🔬", featured: false, bookmarked: true, summary: "Demystifying common lab tests — CBC, lipid panel, HbA1c, liver function, and kidney function. Learn what normal ranges mean and when to be concerned." },
  { id: "EDU-008", title: "Prenatal Care: A Trimester-by-Trimester Guide", category: "Women's Health", readTime: "12 min", author: "Dr. Funke Adeyemi", date: "2026-06-08", image: "🤰", featured: false, bookmarked: false, summary: "Essential prenatal care guide covering nutrition, exercise, warning signs, and appointment schedules for each trimester of pregnancy." },
];

const videos = [
  { id: "VID-001", title: "How to Check Your Blood Pressure at Home", duration: "4:32", category: "Heart Health", views: 2340, thumbnail: "🫀" },
  { id: "VID-002", title: "Proper Handwashing Technique", duration: "2:15", category: "Hygiene", views: 5120, thumbnail: "🧼" },
  { id: "VID-003", title: "Using a Glucometer: Step-by-Step", duration: "5:48", category: "Diabetes", views: 1890, thumbnail: "🩸" },
  { id: "VID-004", title: "5-Minute Desk Stretches for Office Workers", duration: "5:12", category: "Fitness", views: 3450, thumbnail: "🧘" },
  { id: "VID-005", title: "Understanding Your Prescription Labels", duration: "3:45", category: "Medication", views: 1560, thumbnail: "💊" },
  { id: "VID-006", title: "First Aid: How to Treat Burns", duration: "4:08", category: "First Aid", views: 2780, thumbnail: "🔥" },
];

const healthTips = [
  { id: 1, tip: "Drink at least 8 glasses of water daily, especially during the hot season.", category: "Hydration", icon: "💧" },
  { id: 2, tip: "Take your blood pressure medication at the same time every day for best results.", category: "Medication", icon: "💊" },
  { id: 3, tip: "Walk for 30 minutes daily — it can reduce your blood pressure by up to 8 mmHg.", category: "Exercise", icon: "🚶" },
  { id: 4, tip: "Reduce salt intake to less than 1 teaspoon per day to support heart health.", category: "Diet", icon: "🧂" },
  { id: 5, tip: "Get 7-8 hours of sleep — poor sleep increases risk of hypertension and diabetes.", category: "Sleep", icon: "😴" },
];

const conditions = [
  { name: "Hypertension", articles: 12, icon: "🫀" },
  { name: "Diabetes", articles: 9, icon: "🩸" },
  { name: "Malaria", articles: 6, icon: "🦟" },
  { name: "Mental Health", articles: 5, icon: "🧠" },
  { name: "Women's Health", articles: 8, icon: "🤰" },
  { name: "Nutrition", articles: 7, icon: "🥗" },
];

type Tab = "featured" | "articles" | "videos" | "bookmarks" | "conditions";

export default function EducationPage() {
  const [tab, setTab] = useState<Tab>("featured");
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [tipIndex, setTipIndex] = useState(0);

  const categories = [...new Set(articles.map(a => a.category))];
  const filteredArticles = categoryFilter === "all" ? articles : articles.filter(a => a.category === categoryFilter);
  const bookmarked = articles.filter(a => a.bookmarked);
  const articleDetail = selectedArticle ? articles.find(a => a.id === selectedArticle) : null;

  const tabs: { key: Tab; label: string; count?: number }[] = [
    { key: "featured", label: "For You" },
    { key: "articles", label: "Articles", count: articles.length },
    { key: "videos", label: "Videos", count: videos.length },
    { key: "bookmarks", label: "Saved", count: bookmarked.length },
    { key: "conditions", label: "By Condition" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-on-surface">Health Education</h1>
        <p className="text-on-surface-variant text-sm mt-1">Articles, videos, and wellness tips tailored to your health profile</p>
      </div>

      {/* Daily Health Tip */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-5 text-white">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <span className="text-3xl">{healthTips[tipIndex].icon}</span>
            <div>
              <div className="text-xs font-medium uppercase opacity-70">Daily Health Tip</div>
              <p className="text-base font-medium mt-1">{healthTips[tipIndex].tip}</p>
              <span className="text-xs opacity-70 mt-2 inline-block">{healthTips[tipIndex].category}</span>
            </div>
          </div>
          <button onClick={() => setTipIndex((tipIndex + 1) % healthTips.length)} className="px-3 py-1.5 bg-white/20 rounded-lg text-xs font-medium hover:bg-white/30 transition-all shrink-0">Next Tip</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {tabs.map(t => (
          <button key={t.key} onClick={() => { setTab(t.key); setSelectedArticle(null); }} className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${tab === t.key ? "bg-primary text-on-primary shadow-sm" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"}`}>
            {t.label}{t.count !== undefined && ` (${t.count})`}
          </button>
        ))}
      </div>

      {/* Featured / For You Tab */}
      {tab === "featured" && (
        <div className="space-y-6">
          {/* AI Recommendations Banner */}
          <div className="flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-xl p-4">
            <svg className="w-5 h-5 text-blue-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" /></svg>
            <span className="text-sm text-blue-800">Based on your conditions (Hypertension, Type 2 Diabetes), we've curated these articles for you.</span>
          </div>

          {/* Featured Articles */}
          <div>
            <h2 className="text-lg font-semibold text-on-surface mb-3">Recommended for You</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {articles.filter(a => a.featured).map(a => (
                <button key={a.id} onClick={() => { setSelectedArticle(a.id); setTab("articles"); }} className="text-left bg-surface-container-lowest rounded-xl border border-outline-variant p-5 hover:shadow-md transition-all">
                  <div className="flex items-start gap-4">
                    <span className="text-4xl">{a.image}</span>
                    <div>
                      <h3 className="font-bold text-on-surface">{a.title}</h3>
                      <p className="text-sm text-on-surface-variant mt-1 line-clamp-2">{a.summary}</p>
                      <div className="flex items-center gap-3 mt-3 text-xs text-on-surface-variant">
                        <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{a.category}</span>
                        <span>{a.readTime} read</span>
                        <span>{a.author}</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Access Conditions */}
          <div>
            <h2 className="text-lg font-semibold text-on-surface mb-3">Browse by Condition</h2>
            <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
              {conditions.map(c => (
                <button key={c.name} onClick={() => { setTab("conditions"); }} className="bg-surface-container-lowest rounded-xl border border-outline-variant p-4 text-center hover:shadow-md transition-all">
                  <span className="text-2xl">{c.icon}</span>
                  <div className="text-xs font-semibold text-on-surface mt-2">{c.name}</div>
                  <div className="text-[10px] text-on-surface-variant mt-0.5">{c.articles} articles</div>
                </button>
              ))}
            </div>
          </div>

          {/* Trending Videos */}
          <div>
            <h2 className="text-lg font-semibold text-on-surface mb-3">Popular Videos</h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              {videos.slice(0, 3).map(v => (
                <div key={v.id} className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden hover:shadow-md transition-all cursor-pointer">
                  <div className="bg-gray-900 aspect-video flex items-center justify-center relative">
                    <span className="text-4xl">{v.thumbnail}</span>
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/70 rounded text-white text-xs">{v.duration}</div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-semibold text-on-surface line-clamp-2">{v.title}</h3>
                    <div className="flex items-center gap-2 mt-1 text-xs text-on-surface-variant">
                      <span>{v.category}</span>
                      <span>{v.views.toLocaleString()} views</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Articles Tab */}
      {tab === "articles" && (
        <div className="flex gap-6">
          <div className={`${articleDetail ? "w-1/2" : "w-full"} space-y-4 transition-all`}>
            <div className="flex gap-2 flex-wrap">
              <button onClick={() => setCategoryFilter("all")} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${categoryFilter === "all" ? "bg-primary text-on-primary" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"}`}>All ({articles.length})</button>
              {categories.map(c => (
                <button key={c} onClick={() => setCategoryFilter(c)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${categoryFilter === c ? "bg-primary text-on-primary" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"}`}>{c}</button>
              ))}
            </div>

            <div className="space-y-3">
              {filteredArticles.map(a => (
                <button key={a.id} onClick={() => setSelectedArticle(a.id)} className={`w-full text-left bg-surface-container-lowest rounded-xl border p-4 hover:shadow-md transition-all ${selectedArticle === a.id ? "border-primary ring-1 ring-primary" : "border-outline-variant"}`}>
                  <div className="flex items-start gap-3">
                    <span className="text-3xl shrink-0">{a.image}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-on-surface text-sm">{a.title}</h3>
                        {a.bookmarked && <svg className="w-4 h-4 text-amber-500 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" /></svg>}
                      </div>
                      <p className="text-xs text-on-surface-variant mt-1 line-clamp-2">{a.summary}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-on-surface-variant">
                        <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{a.category}</span>
                        <span>{a.readTime}</span>
                        <span>{a.date}</span>
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-outline shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Article Detail */}
          {articleDetail && (
            <div className="w-1/2 bg-surface-container-lowest rounded-2xl border border-outline-variant overflow-hidden">
              <div className="bg-primary p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{articleDetail.image}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase bg-white/20 text-white">{articleDetail.category}</span>
                    </div>
                    <h3 className="text-on-primary font-bold text-lg mt-2">{articleDetail.title}</h3>
                    <p className="text-on-primary/70 text-sm mt-1">{articleDetail.author} · {articleDetail.readTime} read</p>
                  </div>
                  <button onClick={() => setSelectedArticle(null)} className="text-on-primary/70 hover:text-on-primary"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg></button>
                </div>
              </div>
              <div className="p-5 space-y-5">
                <div className="flex items-center gap-3 text-xs text-on-surface-variant">
                  <span>Published: {articleDetail.date}</span>
                  <span>{articleDetail.readTime} read</span>
                </div>

                <div className="bg-surface-container-low rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-on-surface mb-2">Summary</h4>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{articleDetail.summary}</p>
                </div>

                <div className="bg-surface-container-low rounded-xl p-4">
                  <p className="text-sm text-on-surface-variant leading-relaxed">This is a preview of the article content. The full article would contain detailed medical information, infographics, and actionable health advice written by {articleDetail.author}.</p>
                  <p className="text-sm text-on-surface-variant leading-relaxed mt-3">Topics covered include understanding the condition, risk factors, prevention strategies, treatment options, and lifestyle modifications specific to the Nigerian healthcare context.</p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" /></svg>
                    <span className="text-sm font-semibold text-green-800">AI Health Insight</span>
                  </div>
                  <p className="text-xs text-green-700">Based on your health profile, this article is particularly relevant. Discuss the recommendations with your doctor during your next appointment.</p>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2.5 bg-primary text-on-primary rounded-xl text-sm font-medium hover:opacity-90 transition-all flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" /></svg>
                    {articleDetail.bookmarked ? "Saved" : "Save"}
                  </button>
                  <button className="flex-1 px-4 py-2.5 bg-surface-container-low text-on-surface rounded-xl text-sm font-medium hover:bg-surface-container transition-all border border-outline-variant flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" /></svg>
                    Share
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Videos Tab */}
      {tab === "videos" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {videos.map(v => (
              <div key={v.id} className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden hover:shadow-md transition-all cursor-pointer">
                <div className="bg-gray-900 aspect-video flex items-center justify-center relative">
                  <span className="text-5xl">{v.thumbnail}</span>
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/70 rounded text-white text-xs">{v.duration}</div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-all">
                      <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-on-surface text-sm">{v.title}</h3>
                  <div className="flex items-center gap-3 mt-2 text-xs text-on-surface-variant">
                    <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{v.category}</span>
                    <span>{v.views.toLocaleString()} views</span>
                    <span>{v.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bookmarks Tab */}
      {tab === "bookmarks" && (
        <div className="space-y-4">
          {bookmarked.length === 0 ? (
            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-12 text-center">
              <svg className="w-12 h-12 mx-auto text-outline mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" /></svg>
              <h3 className="font-semibold text-on-surface">No saved articles</h3>
              <p className="text-sm text-on-surface-variant mt-1">Bookmark articles to read them later.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {bookmarked.map(a => (
                <button key={a.id} onClick={() => { setSelectedArticle(a.id); setTab("articles"); }} className="w-full text-left bg-surface-container-lowest rounded-xl border border-outline-variant p-4 hover:shadow-md transition-all">
                  <div className="flex items-start gap-3">
                    <span className="text-3xl shrink-0">{a.image}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-on-surface text-sm">{a.title}</h3>
                      <p className="text-xs text-on-surface-variant mt-1 line-clamp-2">{a.summary}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-on-surface-variant">
                        <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{a.category}</span>
                        <span>{a.readTime}</span>
                        <span>{a.author}</span>
                      </div>
                    </div>
                    <svg className="w-4 h-4 text-amber-500 shrink-0 mt-1" fill="currentColor" viewBox="0 0 24 24"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" /></svg>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* By Condition Tab */}
      {tab === "conditions" && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-on-surface">Browse by Health Condition</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {conditions.map(c => (
              <div key={c.name} className="bg-surface-container-lowest rounded-xl border border-outline-variant p-5 hover:shadow-md transition-all">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{c.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-bold text-on-surface">{c.name}</h3>
                    <p className="text-sm text-on-surface-variant mt-0.5">{c.articles} articles available</p>
                  </div>
                  <button onClick={() => { setCategoryFilter(c.name === "Hypertension" ? "Heart Health" : c.name); setTab("articles"); }} className="px-4 py-2 bg-primary/10 text-primary rounded-xl text-sm font-medium hover:bg-primary/20 transition-all">Browse</button>
                </div>
                <div className="mt-3 pt-3 border-t border-outline-variant">
                  <div className="flex flex-wrap gap-2">
                    {articles.filter(a => a.category === c.name || (c.name === "Hypertension" && a.category === "Heart Health")).slice(0, 2).map(a => (
                      <span key={a.id} className="text-xs text-on-surface-variant bg-surface-container-low px-2 py-1 rounded-lg">{a.title}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
