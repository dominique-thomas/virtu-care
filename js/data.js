
//Discussion categories (topics)
const categories = {
  greeting: {
    importance: "Beginning the conversation with a greeting helps establish trust with the patient.",
    covered: false,
    defaultResponses: [
      "Hello!",
      "Hi there!",
      "Hi, it's nice to meet you."
    ]
  },

  reason: {
    covered: false,
    importance: "Understanding the patient's reason for the visit provides a clear starting point and guides the focus of the conversation.",
    defaultResponses: [
      "Just a regular checkup; there's nothing specific going on.",
      "I've been having some discomfort and thought I should get it checked out.",
      "Work's been a little stressful, and I figured it's time to talk to someone about it."
    ]
  },

  duration: {
    covered: false,
    importance: "Understanding how long an issue has been present helps determine its severity and guides diagnosis.",
    defaultResponses: [
      "It started a couple days ago.",
      "I've been dealing with this for about a week now.",
      "Honestly, it's been going on for a few days."
    ]
  },

  reproductive: {
    covered: false,
    importance: "Asking about menstrual cycles is key for understanding the patient's reproductive health and identifying irregularities.",
    defaultResponses: [
      "My last cycle was about a week ago, and everything's been normal.",
      "My last cycle was a week ago&mdash;haven't noticed anything out of the ordinary."
    ]
  },

  medication: {
    covered: false,
    importance: "Discussing current medications is essential for understanding how the patient manages chronic conditions.",
    defaultResponses: [
      "I take them when I remember to, but I'm not perfect.",
      "I've been trying to stay on top of my meds.",
      "Sometimes I forget a dose, but usually I keep track."
    ]
  },

  lifestyle: {
    covered: false,
    importance: "Exploring the patient's daily routines, activity level, and habits provides insight into factors that may influence their health and recovery.",
    defaultResponses: [
      "It's been pretty normal&mdash;just the usual routine.",
      "I try to stay active, but work keeps me busy.",
      "I don't get a lot of downtime lately."
    ]
  },

  sleep: {
    covered: false,
    importance: "Asking about sleep patterns can reveal issues that affect energy, mood, and overall health.",
    defaultResponses: [
      "I sleep okay most nights, but sometimes I wake up tired.",
      "It takes me a while to fall asleep, especially if I've had a stressful day.",
      "I try to get 7 to 8 hours, but it doesn't always happen."
    ]
  },

  diet: {
    covered: false,
    importance: "Asking about the patient's diet helps determine nutritional habits that may be affecting their symptoms or overall health.",
    defaultResponses: [
      "I try to eat healthy, but it's not perfect.",
      "Mostly quick meals or takeout&mdash;depends on the day.",
      "I've been skipping meals more than I should lately."
    ]
  },

  pain: {
    covered: false,
    importance: "Identifying the presence, location, and nature of pain helps guide diagnosis and treatment decisions.",
    defaultResponses: [
      "Nothing serious&mdash;just some occasional aches.",
      "I do get some discomfort now and then, especially after work.",
      "Yeah, there's been some pain, but I've been managing."
    ]
  },

  stress: {
    covered: false,
    importance: "Assessing stress levels provides context for symptoms that may be rooted in emotional strain.",
    defaultResponses: [
      "It's been a little stressful lately, but I'm managing.",
      "Some days are harder than others&mdash;I'm just trying to keep up.",
      "Yeah, I've been feeling more anxious than usual."
    ]
  },

  substance: {
    covered: false,
    importance: "Inquiring about alcohol or drug use can reveal behaviors that may impact treatment effectiveness.",
    defaultResponses: [
      "I drink socially, nothing excessive.",
      "I've cut back a bit recently&mdash;trying to be healthier.",
      "It's not really something I think is a problem."
    ]
  },

  closing: {
    importance: "Concluding the visit respectfully helps build rapport.",
    covered: false,
    defaultResponses: [
      "Take care!",
      "Alright, goodbye.",
      "Goodbye!"
    ]
  }
};
  
  //Character traits (overrides some dialog)
  const characters = {
    tracy: {
      lifestyle: [
        "The kids keep me on my toes, and I've been working extra hours at the daycare.",
        "I try to squeeze in a little time for crafting or reading when I can, but it doesn't always happen.",
        "I barely get a moment to myself these days with everything going on at home and work.",
        "Oh, between church, errands, and the daycare, I hardly stop to breathe.",
        "I recently joined a book club at church&mdash;it's been a nice way to wind down and have some time for myself."
      ],
      sleep: [
        "I try to get sleep, but my youngest still wakes up sometimes in the middle of the night.",
        "It's hard to wind down with everything going on&mdash;between work, the kids, and trying to keep up, my mind just doesn't settle.",
        "I usually end up staying up late watching true crime shows&mdash;it's my guilty pleasure."
      ],
      diet: [
        "We do our best, but sometimes it's fast food on the way to soccer practice because it's just easier.",
        "I try to make balanced meals, but I snack a lot when I'm stressed&mdash;it's hard to resist.",
        "Breakfast is usually rushed, if I have it at all. My mornings are pretty chaotic."
      ],
      pain: [
        "My back acts up sometimes, especially after lifting the toddlers at work.",
        "I get these random aches&mdash;probably from standing too long or just general stress.",
        "It's not awful, but I notice it more at night when things finally quiet down."
      ],
      stress: [
        "Whew, where do I start? It's been a lot lately between work, home, and just trying to keep it together.",
        "I feel like I'm juggling too much and dropping balls left and right.",
        "Sometimes I just cry in the car after a long day, honestly. It's the only place I get a minute alone."
      ],
      medication: [
        "I take something for pain when my back acts up, but I don't like taking pills too much if I can avoid it.",
        "My last doctor gave me something mild for stress, but I haven't taken it regularly&mdash;I keep forgetting."
      ],
      substance: [
        "I don't drink much&mdash;maybe a glass of wine at my book club, but that's about it.",
        "I've never done anything heavy. I need to be there for my kids, so I stay away from that stuff.",
        "Caffeine's my biggest vice&mdash;I have to have coffee to get through the day!"
      ],
      greeting: [
        "Hi, thanks for seeing me today!",
        "Hey! Hope your day's going well so far.",
        "Oh, hello! It's nice to meet you."
      ],
      closing: [
        "Thanks so much for your time.",
        "Take care, okay? I appreciate the chat.",
        "Bye! Hope you have a great rest of your day."
      ],
      reason: [
        "It's just a routine checkup, nothing specific going on.",
        "Mostly here for a follow-up from last month to make sure everything's still on track."
      ],
      reproductive: [
        "My cycle's pretty regular, no issues there.",
        "Everything's normal with my cycle."
      ]
    },
    randy: {
      lifestyle: [
        "Same old grind&mdash;office all day, bar with the guys some evenings just to unwind.",
        "I play a little pool now and then, just to keep things light.",
        "Honestly? I mostly just go home, watch TV, and hang with my cat, Peanut&mdash;she's the best roommate!"
      ],
      sleep: [
        "I sleep fine, but sometimes I stay up too late watching basketball.",
        "Sometimes I crash on the couch with the TV on&mdash;not the best habit, I know.",
        "I get enough rest, more or less."
      ],
      diet: [
        "Mostly takeout or frozen meals&mdash;I'm not much of a cook.",
        "I eat whatever's easy.",
        "Not going to lie, my cat Peanut eats better than I do."
      ],
      pain: [
        "Lower back's been stiff since I helped my brother move a few weeks ago.",
        "Headaches show up now and then&mdash;probably the screens or lack of sleep.",
        "It's manageable. Nothing I'd run to the doctor for... no offense."
      ],
      stress: [
        "Stress? Who isn't stressed these days? Work piles up.",
        "Work's annoying, but I don't lose sleep over it&mdash;I just push through.",
        "It builds up, yeah. I just try not to think about it too much."
      ],
      medication: [
        "Yeah, I've got something for blood pressure and I take it... most days, anyway.",
        "Doc gave me pills a while back, but I hate refilling them&mdash;feels like a chore."
      ],
      substance: [
        "I drink sometimes, nothing serious&mdash;just socially.",
        "Yeah, I've had a few nights out recently, but I keep it under control.",
        "I know I should cut back&mdash;easier said than done, though."
      ],
      greeting: [
        "Hi there.",
        "Hey."
      ],
      closing: [
        "Goodbye.",
        "Thanks... I guess this was helpful.",
        "Later."
      ],
      reason: [
        "Figured I should get checked out... it's been a while since my last visit.",
        "Not sure, just figured I should check in and make sure everything's okay.",
        "Honestly? Just killing time, but might as well talk while I'm here."
      ]
    }
  };
  
  //Scenario data which specifies overrides
  const scenarios = {
    "tracy-checkup": {
      requiredCategories: ["lifestyle", "medication", "stress"],
      keyConcerns: "The patient came in for a routine annual checkup.",
      reason: {
        override: true,
        responses: [
          "I'm just here for a routine checkup.",
          "Nothing major going on. It's just time for my yearly physical."
        ]
      },
      duration: {
        override: true,
        responses: [
          "I'm just here for a routine check-up, so there's nothing in particular going on.",
          "Nothing's been bothering me recently, so that question doesn't really apply."
        ]
      }
    },
  
    "tracy-stomach": {
      requiredCategories: ["duration", "pain", "diet", "medication"],
      keyConcerns: "The patient has been experiencing stomach pain and nausea after a recent potluck meal.",
      pain: {
        override: true,
        responses: [
          "My stomach's just been all over the place&mdash;I think it started after the potluck at church the other day.",
          "It started after that potluck at church. I've barely been able to eat since."
        ]
      },
      diet: {
        override: true,
        responses: [
          "I've mostly been sticking to crackers and ginger ale. Anything else makes me queasy.",
          "Haven't had much of an appetite, honestly."
        ]
      },
      reason: {
        override: true,
        responses: [
          "I've had bad stomach issues the last few days and needed to get it checked.",
          "I was hoping to find out what's causing all this nausea and discomfort."
        ]
      },
      duration: {
        override: true,
        responses: [
          "The stomach pain started about two days ago.",
          "My stomach has been bothering me for a couple days now."
        ]
      }
    },
  
    "tracy-repro": {
      requiredCategories: ["duration", "stress", "pain", "lifestyle", "reproductive"],
      keyConcerns: "The patient has noticed changes in her menstrual cycle and suspects stress might be a factor.",
      stress: {
        override: true,
        responses: [
          "Honestly, I think it's just stress. My cycles have always been a little irregular when I'm overwhelmed.",
          "Between the kids and work, I'm running on empty."
        ]
      },
      pain: {
        override: true,
        responses: [
          "I've been getting some light cramps now and then, but nothing major.",
          "It's more discomfort than real pain."
        ]
      },
      reason: {
        override: true,
        responses: [
          "I've been noticing some irregularities with my cycle and thought I should come in.",
          "Things feel a bit off hormonally, so I wanted to get checked out."
        ]
      },

      reproductive: {
        override: true,
        responses: [
           "My cycle's been a little off lately, but it's usually pretty regular.",
           "I've been noticing some changes in my cycle; I missed my usual period this month."
        ]
      }
    },
  
    "tracy-fatigue": {
      requiredCategories: ["duration", "sleep", "stress", "lifestyle", "reproductive"],
      keyConcerns: "The patient has been experiencing persistent fatigue despite getting sleep.",
      sleep: {
        override: true,
        responses: [
          "I don't really sleep through the night&mdash;the little one still wakes up sometimes.",
          "Even when I do sleep, I wake up feeling like I didn't rest at all."
        ]
      },
      reason: {
        override: true,
        responses: [
          "I've just been feeling unusually tired lately.",
          "I came in because I can't seem to shake this constant fatigue."
        ]
      },
      reproductive: {
        override: true,
        responses: [
          "I've had some light spotting recently, but I think it's just due to stress. It's been happening for a few days.",
          "My cycle's been irregular, with some spotting here and there. Not sure if it's the stress or something else."
        ]
      }
    },
  
    "tracy-pain": {
      requiredCategories: ["duration", "pain", "medication", "lifestyle"],
      keyConcerns: "The patient is dealing with general recurring pain.",
      reason: {
        override: true,
        responses: [
          "I've been having some recurring pain and wanted to get it checked out.",
          "There's been this discomfort that's not going away, so I thought I should come in."
        ]
      }
    },
  
    "randy-hypertension": {
      requiredCategories: ["duration", "medication", "lifestyle", "stress"],
      keyConcerns: "The patient is managing high blood pressure.",
      medication: {
        override: true,
        responses: [
          "Yeah, I take something for my blood pressure. I'm not the best at remembering to take it.",
          "I'm trying to stay on top of taking my blood pressure medicine, but sometimes I forget."
        ]
      },
      lifestyle: {
        override: true,
        responses: [
          "I guess I could probably cut back on the bar food and late nights.",
          "My job's pretty sedentary, so I don't move much during the day."
        ]
      },
      pain: {
        override: true,
        responses: [
          "I've been getting these dull headaches, especially in the mornings. I figured it was just stress or staring at screens too long.",
          "Now that you mention it, my head has been pounding a lot more lately."
        ]
      },
      diet: {
        override: true,
        responses: [
          "Probably not the best, but I usually eat salty snacks and fast food.",
          "I eat out a lot, and it's usually whatever's quick... burgers, fries, that kind of thing."
        ]
      },
      duration: {
        override: true,
        responses: [
          "The headaches have been on and off for a few weeks.",
          "This has been building up for a while now. I think it's been a little over a month."
        ]
      }
    },
  
    "randy-substance": {
      requiredCategories: ["duration", "lifestyle", "stress"],
      keyConcerns: "The patient has been struggling with coping habits, possibly using alcohol more than they should.",
      lifestyle: {
        override: true,
        responses: [
          "I've been out drinking a bit more lately&mdash;work's rough, and it helps me switch off.",
          "It's possible I've been leaning on the bottle too much.",
          "Honestly, sleep's been rough. Some nights I stay out late with the guys, have a few drinks, and then I'm wired when I get home.",
          "Yeah, I don't sleep great. I end up crashing late after hanging out or watching TV. Then I'm up early feeling groggy."
        ]
      },
      stress: {
        override: true,
        responses: [
          "Sometimes a drink's the only way to shut my brain up.",
          "Stress? Who isn't stressed?"
        ]
      },
      reason: {
        override: true,
        responses: [
          "My brother thought it was time I talk to someone about some of my habits.",
          "Honestly, I've been having a tough time keeping things in control lately."
        ]
      },
      duration: {
        override: true,
        responses: [
           "It's not really a new thing. It's just how I've been living for a while.",
           "Hard to say how long exactly... it's been a part of my routine for years."
        ]
      }
    },
  
    "shared-lowerback": {
      requiredCategories: ["duration", "pain", "lifestyle", "medication"],
      keyConcerns: "The patient is dealing with ongoing lower back pain.",
      medication: {
        override: true,
        responses: [
          "Just the usual over-the-counter stuff when it flares up.",
          "Nothing prescription, I just take a pain reliever now and then when it gets bad."
        ]
      },
      pain: {
        override: true,
        responses: [
          "It's a dull ache most of the time, but bending or lifting makes it worse.",
          "My lower back pain started after I moved some furniture the other day, and it's never quite healed."
        ]
      },
      reason: {
        override: true,
        responses: [
          "My back's been acting up again, and I figured it was time to address it.",
          "The pain's affecting my day-to-day, so I came in."
        ]
      },
      duration: {
        override: true,
        responses: [
          "It started about a week ago after I helped move some furniture.",
          "Been feeling it in my lower back for the past few days."
        ]
      }
    },
  
    "shared-fatigue": {
      requiredCategories: ["duration", "sleep", "stress", "medication"],
      keyConcerns: "The patient reports chronic fatigue.",
      sleep: {
        override: true,
        responses: [
          "I'm tired all the time, and it doesn't matter how long I sleep.",
          "I can't seem to get quality rest, and it seems like I'm always dragging."
        ]
      },
      stress: {
        override: false
      },
      reason: {
        override: true,
        responses: [
          "I've been feeling totally drained, so I figured I should get it checked out.",
          "I came in because I just can't shake this tiredness."
        ]
      }
    },
  
    "shared-surgery": {
      requiredCategories: ["pain", "lifestyle", "medication"],
      keyConcerns: "The patient is recovering from a recent knee surgery.",
      pain: {
        override: true,
        responses: [
          "My knee still aches a bit, especially around the stitches.",
          "My knee feels mostly better, but I get sore if I move too quickly."
        ]
      },
      lifestyle: {
        override: true,
        responses: [
          "I've been taking it easy since the knee surgery.",
          "My surgeon told me to walk a little each day, but I'm still mostly resting my knee."
        ]
      },
      reason: {
        override: true,
        responses: [
          "This is just a follow&mdash;up after my knee surgery, to make sure everything's healing right.",
          "My doctor asked me to come in so they could check the incision site on my knee."
        ]
      },
      medication: {
        override: true,
        responses: [
          "Just whatever the doctor prescribed after surgery. It's pretty strong, so I try not to take it unless I really need it.",
          "Yeah, I've got meds from the surgery. I don't love taking them too often."
        ]
      },
      duration: {
        override: true,
        responses: [
          "This is just a post-op follow-up. There's no new issue that started recently.",
          "Nothing new to time; I'm just here after my surgery to check in."
        ]
      }
    }
  };
  
  //Fall back responses if we can't determine what to say
  const characterFallbackResponses = [
      "I didn't quite get that, maybe try asking something else?",
      "Hmm, I'm not sure about that, can we talk about something else?",
      "You've got me stumped! What else can we talk about?",
      "Not sure what you're asking me, but... yeah",
      "I don't really understand",
      "Couldn't catch that, let's move on"  
  ];
  
  const hintSuggestions = [
    { category: "lifestyle", hint: "Try asking about their daily routine or physical activity levels." },
    { category: "sleep", hint: "Ask how well they've been sleeping or if they feel rested." },
    { category: "diet", hint: "Check on their eating habits or recent changes in appetite." },
    { category: "pain", hint: "Ask if they're experiencing any pain or discomfort." },
    { category: "stress", hint: "Try asking how they've been coping emotionally or mentally." },
    { category: "medication", hint: "Ask if they're currently taking any medications or prescriptions." },
    { category: "substance", hint: "Gently bring up alcohol, tobacco, or other substance use." },
    { category: "reason", hint: "Start by asking what brought them in for today's visit." }
  ];

  const keywords = {
    greeting: [
      "hello", "hi", "hey", "good morning", "good afternoon", "good evening",
      "greetings", "howdy", "how is it going", "how are you", 
      "pleasure", "nice to", "help you", "good to see you",
      "welcome", "hey there"
    ],

    duration:[
      "how long", "when did this start", "since when", "for how many days", "for how long",
      "has this been going on", "when did you first notice", "has it been happening for a while",
      "started when", "how recently", "how long has it bothered you", "when did it begin"
    ],

    reason: [
      "what brings you in", "why are you here", "reason for your visit", "what's going on", "what's bothering you", 
      "how can i help", "why did you come in", "what brings you here", "what are you here for", 
      "what seems to be the problem", "what are we seeing you for", "what's the concern today", 
      "what are we talking about today"],

    reproductive: [
      "menstrual cycle", "your period", "last period", "are your cycles regular", "any spotting", 
      "last menstrual cycle", "missed period", "irregular bleeding", "pregnant", "pregnancy"],
    
    lifestyle: [
      "lifestyle", "routine", "daily", "activity", "habits", "exercise", "workout", "physical activity",
      "fitness", "schedule", "work life", "daily routine", "stress levels", "routine maintenance",
      "balance", "hobbies", "well-being", "routine changes"
    ],
  
    sleep: [
      "sleep", "insomnia", "tired", "rest", "fatigue", "bedtime", "sleep quality", "sleep pattern",
      "trouble sleeping", "waking up", "night sleep", "restful sleep", "rested", "naps", "sleeping habits",
      "snoring", "dreams", "deep sleep", "poor sleep", "circadian rhythm"
    ],
  
    diet: [
      "diet", "food", "eating", "eat", "appetite", "nutrition", "meals", "snacks", "calories", 
      "healthy eating", "meal plan", "balanced diet", "junk food", "vegetables", "fruit", "fast food",
      "sugar", "processed food", "eating habits", "meal timing", "drinks", "sweets", "carbs", "protein",
      "dietary preferences", "diet changes", "nutrition plan"
    ],
  
    pain: [
      "pain", "ache", "hurt", "sore", "discomfort", "stiffness", "pressure", "pain level", "muscle pain",
      "joint pain", "headache", "back pain", "neck pain", "throbbing", "sharp pain", "chronic pain", 
      "nagging pain", "cramps", "tenderness", "body aches", "pain management", "pain relief", "pain medication"
    ],
  
    stress: [
      "stress", "anxiety", "worried", "overwhelmed", "pressure", "mental", "worry", "mood", "nervous",
      "stressed out", "panic", "tension", "burnout", "feeling tense", "unsettled", "nervousness", "mental health",
      "emotional strain", "frustration", "feeling anxious", "stress management", "feeling overwhelmed", 
      "emotional pressure", "restlessness", "work stress", "life stress", "personal stress"
    ],
  
    medication: [
      "medication", "pills", "prescription", "taking", "medicine", "drugs", "treatment", "pharmacy", 
      "prescribed", "dosage", "medicine regimen", "doctor's orders", "health supplements", "antidepressants",
      "painkillers", "antibiotics", "heart medication", "blood pressure meds", "sleep aids", "inhaler", 
      "insulin", "meds", "prescriptions"
    ],
  
    substance: [
      "alcohol", "drinking", "smoking", "drugs", "substance", "substance abuse", "alcoholism", "drunken", 
      "beer", "wine", "cocktails", "liquor", "cigarettes", "tobacco", "vape", "addiction", "substance use",
      "dependency", "recovery", "drug use", "marijuana", "weed", "pills", "overuse", "alcohol consumption",
      "drug abuse"
    ],
  
    closing: [
      "bye", "goodbye", "take care", "see you later", "have a good day", "good evening", "good night", 
      "see you soon", "farewell", "until next time", "catch you later", "later", "adios",
      "so long", "take it easy", "talk soon", "goodbye for now", "until we meet again", "ciao", "have a good one"
    ]
  };

  const emotionKeywords = {
    tracy: {
      sad: ["pain", "fatigue", "stomach", "nausea", "back", "sick", "unwell"],
      angry: ["stressed", "frustrated", "overwhelmed", "annoyed", "tired"],
      neutral: []
    },
    randy: {
      sad: ["headaches", "pain", "sick", "tired"],
      angry: ["work", "stress", "annoyed", "frustrated"],
      neutral: []
    },
    checkup: {
      sad: ["sick", "pain", "health", "struggling"],
      angry: ["frustrated", "work", "stress"],
      neutral: []
    }
  };

  const patientProfiles = {
    tracy: {
      name: "Tracy Ellis",
      age: 27,
      sexAssignedAtBirth: "Female",
      pronouns: "She/Her",
      race: "African American",  
      height: "5'4\"",
      weight: "173 lbs",                
      reasonForVisit: "Unknown",
      medicalConditions: "Seasonal allergies",
      medications: "Over-the-counter pain relievers",
      familyHistory: "Mother has type 2 diabetes"
    },
    randy: {
      name: "Randy Brooks",
      age: 42,   
      sexAssignedAtBirth: "Male",
      pronouns: "He/Him",
      race: "Caucasian",         
      height: "5'9\"",
      weight: "160 lbs",
      reasonForVisit: "Unknown",
      medicalConditions: "Hypertension",
      medications: "High blood pressure medication",
      familyHistory: "Father had heart disease"
    }
  }; 
  
  const categoryIcons  = {
    greeting: "fa-handshake",
    reproductive: "fa-calendar-check",
    duration: "fa-clock",
    lifestyle: "fa-person-walking",       
    sleep: "fa-bed",                      
    diet: "fa-utensils",                 
    pain: "fa-heart-crack",            
    stress: "fa-brain",                 
    medication: "fa-pills",             
    substance: "fa-wine-bottle",        
    reason: "fa-comment-medical",   
    closing: "fa-door-closed"
  };
  