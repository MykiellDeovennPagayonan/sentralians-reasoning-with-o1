import Spelling from '@/components/chat/interactive-components/spelling'
import React from 'react'

const mockData = [
  {
    word: "Inconspicuous",
    definition: "Not attracting attention or notice.",
    examples: [
      "The wildlife photographer remained hidden so as not to draw attention.",
      "She wore an inconspicuous outfit to blend in with the crowd.",
      "His inconspicuous manner made him a good secret agent."
    ],
  },
  {
    word: "Eloquent",
    definition: "Fluent or persuasive in speaking or writing.",
    examples: [
      "Her speech was powerful and moving, capturing the attention of everyone in the room.",
      "He was an eloquent speaker who could sway any audience.",
      "The author's eloquent prose painted vivid images in the reader's mind."
    ],
  },
  {
    word: "Ambiguous",
    definition: "Open to more than one interpretation; not having one obvious meaning.",
    examples: [
      "The instructions were unclear and open to different interpretations.",
      "His ambiguous response left everyone confused.",
      "The poem's meaning was ambiguous, inviting various interpretations."
    ],
  },
  {
    word: "Magnanimous",
    definition: "Very generous or forgiving, especially toward a rival or someone less powerful.",
    examples: [
      "After winning the game, he showed great kindness in his interaction with the opposing team.",
      "Her magnanimous gesture of donating to the charity was widely praised.",
      "Despite their differences, he was magnanimous enough to congratulate his rival."
    ],
  },
  {
    word: "Circumference",
    definition: "The enclosing boundary of a curved geometric figure, especially a circle.",
    examples: [
      "They measured the distance around the circular garden.",
      "To find the circumference of a circle, multiply the diameter by pi.",
      "The circumference of the earth is about 40,075 kilometers."
    ],
  },
  {
    word: "Substantiate",
    definition: "Provide evidence to support or prove the truth of something.",
    examples: [
      "The lawyer presented documents to back up her claims in court.",
      "He could not substantiate his argument with facts.",
      "They needed to substantiate their findings with reliable data."
    ],
  },
  {
    word: "Mellifluous",
    definition: "Sweet or musical; pleasant to hear.",
    examples: [
      "The sound of her voice was so pleasing that everyone stopped to listen.",
      "He loved the mellifluous tones of the jazz band.",
      "The mellifluous song filled the air with joy."
    ],
  },
  {
    word: "Euphemism",
    definition: "A mild or indirect word or expression substituted for one considered to be too harsh or blunt.",
    examples: [
      "He used a gentler word to avoid stating the harsh reality directly.",
      "Using 'passed away' as a euphemism for 'died' is common in conversations.",
      "The company used a euphemism to describe the layoffs as 'rightsizing'."
    ],
  },
  {
    word: "Nomenclature",
    definition: "The devising or choosing of names for things in a particular field.",
    examples: [
      "The scientist explained the naming system used for the newly discovered species.",
      "In biology, nomenclature is essential for classification.",
      "The nomenclature of chemical compounds can be complex."
    ],
  },
  {
    word: "Quintessential",
    definition: "Representing the most perfect or typical example of a quality or class.",
    examples: [
      "She was the perfect example of a dedicated teacher.",
      "This painting is the quintessential representation of the artist's style.",
      "The film is considered the quintessential romantic comedy."
    ],
  },
];


export default function Page() {
  return (
    <Spelling spellings={mockData} />
  )
}