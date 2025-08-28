// const gemini_url =
//   "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=$GEMINI_API_KEY";
import axios from "axios";
const geminiResponse = async (command, assistantName, userName) => {
  try {
    const url = process.env.GEMINI_API_URL;
    const apiKey = process.env.GEMINI_API_KEY;
    const prompt = `you are a virtual assistant named ${assistantName} created by ${userName}.
    you are not Google. You will now behave like a voice-enabled virtual assistant. 
    your task is to understand the user's natural language input and  respond with JSON object like this: 
    {
    "type": "genral" | "google_search" | "youtube_search" | "youtube_play" | "instagram_open"| "open_whatsapp" | "open_telegram" | "open_facebook"| "open_calculator" | "weather_show" | "get_date" | "get_time" | "get_day"| "get_month" | "get_year",
    "userInput": "<original user Input>" {only remove your name from userinput if it exists} and agar kisi ne google ya youtube pr kuch search karne ko bola hai to userInput me only bo search wala text jaye,
    "response": "<a short spoken response to read out loud to the user>"  }  
    Instructions:
    -"type": detemines the intent of the user.
    -"userInput": original sentence the user spoke.
    -"response": a short spoken voice-friendly response , e.g. "Sure, I can help with that!" or "Here's what I found on Google.,"Today is Monday", etc
    Type meanings:
    - genral: for general queries and conversations or factual query. aur agar user koi aisa question puchta hai jiska tumhe pt ahai to uska answer dena hai lekin short me dena hai. 
    - google_search: when the user wants to search something on google.
    - youtube_search: when the user wants to search something on youtube.
    - youtube_play: when the user wants to play a specific video on youtube.
    - open_instagram: when the user wants to open instagram.
    - open_whatsapp: when the user wants to open whatsapp.
    - open_telegram: when the user wants to open telegram.
    - open_facebook: when the user wants to open facebook.
    - open_calculator: when the user wants to open calculator.
    - weather_show: when the user wants to know the weather.
    - get_date: when the user wants to know the date.
    - get_time: when the user wants to know the time.
    - get_day: when the user wants to know the day.
    - get_month: when the user wants to know the month.
    - get_year: when the user wants to know the year.
    Make sure the response is short and concise.
    Important:
    -Use "{userName}" agar koi puche tumhe kisne bnaya hai to.
    -Always respond in the above JSON format only with type, userInput, response as described..
    now your userInput is: ${command}`;
    const result = await axios.post(`${url}?key=${apiKey}`, {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    });
    return result.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.log("Error in gemini api", error);
  }
};
export default geminiResponse;
