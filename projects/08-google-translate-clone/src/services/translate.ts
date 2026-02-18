
import { SUPPORTED_LANGUAGES } from "../constants";
import type { FromLanguage, Language } from "../types.d";

const ApiKey = 'Put your OpenRouter ApiKey here. The LLM used is arcee-ai/trinity-mini:free.'

export async function translate({
    fromLanguage,
    toLanguage,
    text
}: {
    fromLanguage: FromLanguage,
    toLanguage: Language,
    text: string
}) {
    if (fromLanguage === toLanguage) return text
    const messages = [
        {
            "role": 'system',
            "content": 'You are an AI that translates text. You receive a text from the user and you translate the text. You dont have to answer, just translate the text.The original language is surrounded by `{{` and `}}`. You can also recive {{auto}}, which means that you have to detect the language. The language you translate to is surrounded bu `[[` and `]]`.'

        },
        {
            "role": 'user',
            "content": 'Hola mundo {{Spanish}} [[English]]'
        },
        {
            "role": 'assistant',
            "content": 'Hello world'
        },
        {
            "role": 'user',
            "content": 'How are you? {{auto}} [[Deutsch]]'
        },
        {
            "role": 'assistant',
            "content": 'Wie geht es dir?'
        },
        {
            "role": 'user',
            "content": 'Bon dia, com estas? {{auto}} [[Spanish]]'
        },
        {
            "role": 'assistant',
            "content": 'Buenos dias, como estas?'
        }
    ]

    const fromCode = fromLanguage === 'auto' ? 'auto' : SUPPORTED_LANGUAGES[fromLanguage]
    const toCode = SUPPORTED_LANGUAGES[toLanguage]


    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${ApiKey}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "model": "arcee-ai/trinity-mini:free",
            "messages": [
                ...messages,
                {
                    "role": "user",
                    "content": `El texto a traducir es: ${text}.    Este es el idioma en el que viene: {{${fromCode}}}. Y este es el idioma al que lo traduciras: [[${toCode}]]. Solo devuelve la traduccion, mas nada.`
                }
            ],
            "reasoning": { "enabled": true }
        })
    });


    const result = await response.json();
    // console.log(result)
    return result.choices[0]?.message?.content;

    // const completion = await client.chat.completions.create({
    //     model: 'gpt-3.5-turbo',
    //     messages: [
    //         ...messages,
    //         {
    //             role: 'user',
    //             content: `${text} {{${fromCode}}}  [[${toCode}]]`
    //         }
    //     ]
    // })

    // return completion.choices[0]?.message?.content

}