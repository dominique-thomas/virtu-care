
//Discussion categories (topics)
const categories = {
    greeting: {
        importance: "Greetings help set the tone for the conversation and build rapport with the patient.",
        defaultResponses: [
          "Hello!",
          "Hi there!",
          "Hi, it's nice to meet you"      
        ]
      },
    
      reason: {
        covered: false,
        importance: "Understanding the reason for today's visit helps set the context for the interaction.",
        defaultResponses: [
          "Just a regular check-up&mdash;there's nothing specific going on",
          "I've been having some discomfort and thought I should get it checked out",
          "Work's been stressful, and I figured it's time to talk to someone about it"
        ]
      },

      medication: {
        covered: false,
        importance: "Adherence to medication is key for managing chronic conditions.",
        defaultResponses: [
          "I take them when I remember to, but I'm not perfect",
          "I've been trying to stay on top of my meds",
          "Sometimes I forget a dose, but usually I keep track"
        ]
      },

    lifestyle: {
      covered: false,
      importance: "Lifestyle patterns help identify burnout, inactivity, or poor routine.",
      defaultResponses: [
        "It's been pretty normal, just the usual routine",
        "I try to stay active, but work keeps me busy",
        "I don't get a lot of downtime lately"
      ]
    },
    sleep: {
      covered: false,
      importance: "Sleep habits can indicate mental health concerns, fatigue, or chronic stress.",
      defaultResponses: [
        "I sleep okay most nights, but sometimes I wake up tired",
        "It takes me a while to fall asleep, especially if I've had a stressful day",
        "I try to get 7 to 8 hours, but it doesn't always happen"
      ]
    },
    diet: {
      covered: false,
      importance: "Diet impacts energy, immunity, and can aggravate certain conditions.",
      defaultResponses: [
        "I try to eat healthy, but it's not perfect",
        "Mostly quick meals or takeout&mdash;depends on the day",
        "I've been skipping meals more than I should lately"
      ]
    },
    pain: {
      covered: false,
      importance: "Pain may be physical (e.g., injury) or reflect underlying stress or chronic conditions.",
      defaultResponses: [
        "Nothing serious, just some occasional aches",
        "I do get some discomfort now and then, especially after work",
        "Yeah, there's been some pain but I've been managing"
      ]
    },
    stress: {
      covered: false,
      importance: "Stress can underlie sleep issues, anxiety, and physical complaints.",
      defaultResponses: [
        "It's been a little stressful lately, but I'm managing",
        "Some days are harder than others, I'm just trying to keep up",
        "Yeah, I've been feeling more anxious than usual"
      ]
    },

    substance: {
      covered: false,
      importance: "Alcohol or drug use can interfere with treatment.",
      defaultResponses: [
        "I drink socially, nothing excessive",
        "I've cut back a bit recently&mdash;trying to be healthier",
        "It's not really something I think is a problem"
      ]
    },
  
    goodbyes: {
        importance: "Goodbyes help close the conversation and leave the patient with a positive final note.",
        defaultResponses: [
          "Take care!",
          "Alright, goodbye",
          "Goodbye!"
        ]
      },
    
  };
  
  //Character traits (overrides some dialog)
  const characters = {
    tracy: {
      lifestyle: [
        "Kids keep me on my toes, and I've been working extra hours at the daycare",
        "I try to squeeze in a little time for crafting or reading when I can",
        "I barely get a moment to myself these days",
        "Oh, between church and errands, I hardly stop",
        "I recently joined a book club at church&mdash;it's been nice to wind down that way"
      ],
      sleep: [
        "I try to get sleep, but my youngest still wakes up sometimes",
        "It's hard to wind down with everything going on",
        "I usually end up staying up late watching true crime shows"
      ],
      diet: [
        "We do our best, but sometimes it's fast food on the way to soccer practice",
        "I try to make balanced meals, but I snack a lot when I'm stressed",
        "Breakfast is usually rushed, if I have it at all"
      ],
      pain: [
        "My back acts up sometimes, especially after lifting the toddlers at work",
        "I get these random aches&mdash;probably from standing too long at work",
        "It's not awful, but I notice it more at night"
      ],
      stress: [
        "Whew, where do I start? It's been a lot lately",
        "I feel like I'm juggling too much and dropping balls left and right",
        "Sometimes I just cry in the car after a long day, honestly"
      ],
      medication: [
        "I take something for pain when my back acts up, but I don't like taking pills too much",
        "My last doctor gave me something mild for stress, but I haven't taken it regularly"
      ],
      substance: [
        "I don't drink much&mdash;maybe a glass of wine at my book club",
        "I've never done anything heavy, I need to be there for my kids",
        "Caffeine's my biggest vice, I have to have coffee!"
      ],
      greeting: [
        "Hi, thanks for seeing me today",
        "Hey! Hope your day's going well",
        "Oh hello!"
      ],
      goodbyes: [
        "Thanks so much",
        "Take care, okay?",
        "Bye!"
      ],
      reason: [
        "It's just a routine check&mdash;up",
        "Mostly here for a follow&mdash;up from last month"
      ]
    },
    randy: {
      lifestyle: [
        "Same old grind&mdash;office all day, bar with the guys some evenings.",
        "I play a little pool now and then.",
        "Honestly? I mostly just go home, watch TV, and hang with my cat, Peanut"
      ],
      sleep: [
        "I sleep fine, but sometimes I stay up too late watching basketball",
        "Sometimes I crash on the couch with the TV on",
        "I get enough"
      ],
      diet: [
        "Mostly takeout or frozen meals",
        "I eat whatever's easy",
        "Not going to lie, my cat Peanut eats better than I do"
      ],
      pain: [
        "Lower back's been stiff since I helped my brother move",
        "Headaches show up now and then&mdash;probably the screens",
        "It's manageable. Nothing I'd run to the doctor for...no offense"
      ],
      stress: [
        "Stress? Who isn't stressed?",
        "Work's annoying, but I don't lose sleep over it",
        "It builds up, yeah. I just try not to think about it"
      ],
      medication: [
        "Yeah, I've got something for blood pressure and I take it... most days",
        "Doc gave me pills a while back, but I hate refilling them cause it feels like a chore"
      ],
      substance: [
        "I drink sometimes, nothing serious",
        "Yeah, I've had a few nights out recently",
        "I know I should cut back, easier said than done..."
      ],
      greeting: [
        "Hi",
        "Hey"
      ],
      goodbyes: [
        "Goodbye",
        "Thanks... I guess this was helpful",
        "Later"
      ],
      reason: [
        "Figured I should get checked out... it's been a while",
        "Not sure, just figured I should check in",
        "Honestly? Just killing time, but might as well talk while I'm here"
      ]
    }
  };
  
  //Scenario data which specifies overrides
  const scenarios = {
    "tracy&mdash;checkup": {
      lifestyle: { override: false },
      medication: { override: false },
      stress: { override: false },
      reason: {
        override: true,
        responses: [
          "I'm just here for a routine checkup",
          "Nothing major going on. It's just time for my yearly physical"
        ]
      }
    },
  
    "tracy&mdash;stomach": {
      pain: {
        override: true,
        responses: [
          "My stomach's just been all over the place; cramping, nausea... the works",
          "It started after that potluck at church. I've barely been able to eat since"
        ]
      },
      diet: {
        override: true,
        responses: [
          "I've mostly been sticking to crackers and ginger ale, anything else makes me queasy",
          "Haven't had much of an appetite, honestly"
        ]
      },
      reason: {
        override: true,
        responses: [
          "I've had bad stomach issues the last few days and needed to get it checked",
          "I was hoping to find out what's causing all this nausea and discomfort"
        ]
      }
    },
  
    "tracy&mdash;repro": {
      stress: {
        override: true,
        responses: [
          "Honestly, I think it's just stress; my cycles have always been a little irregular when I'm overwhelmed",
          "Between the kids and work, I'm running on empty"
        ]
      },
      pain: {
        override: true,
        responses: [
          "I've been getting some light cramps now and then, but nothing major",
          "It's more discomfort than real pain"
        ]
      },
      reason: {
        override: true,
        responses: [
          "I've been noticing some irregularities with my cycle and thought I should come in",
          "Things feel a bit off hormonally, so I wanted to get checked out"
        ]
      }
    },
  
    "tracy&mdash;fatigue": {
      sleep: {
        override: true,
        responses: [
          "I don't really sleep through the night&mdash;the little one still wakes up sometimes",
          "Even when I do sleep, I wake up feeling like I didn't rest at all"
        ]
      },
      reason: {
        override: true,
        responses: [
          "I've just been feeling unusually tired lately",
          "I came in because I can't seem to shake this constant fatigue"
        ]
      }
    },
  
    "tracy&mdash;pain": {
      reason: {
        override: true,
        responses: [
          "I've been having some recurring pain and wanted to get it checked out",
          "There's been this discomfort that's not going away, so I thought I should come in"
        ]
      }
    },
  
    "randy&mdash;hypertension": {
      medication: {
        override: true,
        responses: [
          "Yeah, I take something for my blood pressure; I'm not the best at remembering to take it",
          "My last doctor warned me about it, so I'm trying to stay on top of it...mostly"
        ]
      },
      lifestyle: {
        override: true,
        responses: [
          "I guess I could probably cut back on the bar food and late nights",
          "My job's pretty sedentary, so I don't move much during the day"
        ]
      }
    },
  
    "randy&mdash;substance": {
      lifestyle: {
        override: true,
        responses: [
          "I've been out drinking a bit more lately&mdash;work's rough, and it helps me switch off",
          "It's possible I've been leaning on the bottle too much"
        ]
      },
      stress: {
        override: true,
        responses: [
          "Sometimes a drink's the only way to shut my brain up",
          "Stress? Let's just say I don't unwind like normal people"
        ]
      },
      reason: {
        override: true,
        responses: [
          "My brother thought it was time I talk to someone about some of my habits",
          "Honestly, I've been having a tough time keeping things in control lately"
        ]
      }
    },
  
    "shared&mdash;lowerback": {
      pain: {
        override: true,
        responses: [
          "It's a dull ache most of the time, but bending or lifting makes it worse",
          "Started after I moved some heavy furniture the other day and it's never quite healed"
        ]
      },
      reason: {
        override: true,
        responses: [
          "My back's been acting up again and I figured it was time to address it",
          "The pain's affecting my day&mdash;to&mdash;day, so I came in"
        ]
      }
    },
  
    "shared&mdash;fatigue": {
      sleep: {
        override: true,
        responses: [
          "I'm tired all the time and it doesn't matter how long I sleep",
          "Can't seem to get quality rest and it seems like I'm always dragging"
        ]
      },
      stress: {
        override: false
      },
      reason: {
        override: true,
        responses: [
          "I've been feeling totally drained, so I figured I should get it checked out",
          "I came in because I just can't shake this tiredness"
        ]
      }
    },
  
    "shared&mdash;surgery": {
      pain: {
        override: true,
        responses: [
          "It still aches a bit, especially around the stitches",
          "Mostly better, but I get sore if I move too quickly"
        ]
      },
      lifestyle: {
        override: true,
        responses: [
          "I've been taking it easy since the surgery",
          "My surgeon told me to walk a little each day, but I'm still mostly resting"
        ]
      },
      reason: {
        override: true,
        responses: [
          "This is just a follow&mdash;up after my surgery, to make sure everything's healing right",
          "My doctor asked me to come in so they could check the incision site"
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
  