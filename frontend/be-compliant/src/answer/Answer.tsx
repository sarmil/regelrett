import { useEffect, useState } from "react";
import { Select } from "@kvib/react";

type Answer = {
  questionId: string;
  answer: string;
};

interface AnswerProps {
  choices: string[];
  answer: Answer | undefined;
  record: Record<any, any>;
}

export const Answer = (props: AnswerProps) => {
  const [choices, setChoices] = useState<string[]>(props.choices);

  useEffect(() => {
    setChoices(props.choices);
  }, [props.choices]);

  const submitAnswer = async (answer: string, record: Record<any, any>) => {
    const url = "http://localhost:8080/answer"; // TODO: Place dev url to .env file
    const settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        actor: "Unknown",
        questionId: record.fields.ID,
        question: record.fields.Aktivitiet,
        answer: answer,
      }),
    };
    try {
      const response = await fetch(url, settings);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error("There was an error with the submitAnswer request:", error);
    }
    return;
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    submitAnswer(e.target.value, props.record);
  };

  return (
    <Select
      aria-label="select"
      placeholder="Velg alternativ"
      onChange={handleChange}
    >
      {choices.map((choice, index) => (
        <option
          value={choice}
          key={index}
          selected={props.answer?.answer === choice}
        >
          {choice}
        </option>
      ))}
    </Select>
  );
};