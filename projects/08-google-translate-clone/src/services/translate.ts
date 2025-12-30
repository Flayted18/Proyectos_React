// import OpenAI from "openai";
import type {ChatCompletionMessageParam} from 'openai/resources/chat/completions'

import { SUPPORTED_LANGUAGES } from "../constants";
import type { FromLanguage, Language } from "../types.d";

// const client = new OpenAI({
//     apiKey : import.meta.env.VITE_OPENAI_API_KEY,
//     dangerouslyAllowBrowser: true
// })

export async function translate({
    fromLanguage,
    toLanguage,
    text
}:{ fromLanguage: FromLanguage,
    toLanguage: Language,
    text: string
}) {
    if (fromLanguage === toLanguage) return text
    const messages: ChatCompletionMessageParam[] = [
        {
            role: 'system',
            content: 'You are an AI that translates text. You receive a text from the user and you translate the text. You dont have to answer, just translate the text.The original language is surrounded by `{{` and `}}`. You can also recive {{auto}}, which means that you have to detect the language. The language you translate to is surrounded bu `[[` and `]]`.'

        },
        {
            role: 'user',
            content: 'Hola mundo {{Spanish}} [[English]]'
        },
        {
            role: 'assistant',
            content: 'Hello world'
        },
        {
            role: 'user',
            content: 'How are you? {{auto}} [[Deutsch]]'
        },
        {
            role: 'assistant',
            content: 'Wie geht es dir?'
        },
        {
            role: 'user',
            content: 'Bon dia, com estas? {{auto}} [[Spanish]]'
        },
        {
            role: 'assistant',
            content: 'Buenos dias, como estas?'
        }
    ]

    /*
    Estoy cambiando el async function por un fetch porque estoy haciendo un proxy diferente para
    Evitar el bloqueo por CORS.
    Pero de igual forma no funciona porque estoy bloqueado por VPN.
    
    Una alternativa seria usar otra API de otro LLM.
    */

//     const response = await fetch('/openai/v1/chat/completions', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
//   },
//   body: JSON.stringify({
//     model: 'gpt-3.5-turbo',
//     messages: [
//       { role: 'system', content: 'You are a translator. Only translate.' },
//       { role: 'user', content: text }
//     ]
//   })
// });

// if (!response.ok) {
//   const err = await response.text();
//   console.error("OpenAI error:", err);
//   throw new Error(`OpenAI request failed: ${response.status}`);
// }

// const data = await response.json();
// console.log(data); // Revisar la estructura
// return data.choices[0].message.content; // ⚠️ solo si choices existe


    const fromCode = fromLanguage === 'auto' ? 'auto' : SUPPORTED_LANGUAGES[fromLanguage]
    const toCode = SUPPORTED_LANGUAGES[toLanguage]



    const completion = await client.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            ...messages,
            {
                role: 'user',
                content: `${text} {{${fromCode}}}  [[${toCode}]]`
            }
        ]
    })

    return completion.choices[0]?.message?.content
    
}