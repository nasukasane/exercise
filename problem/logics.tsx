import {  PickSet } from "./main";

export function getResult(
  choicedNumber: number,
  choicedSet: PickSet,
  answer: number | PickSet,
): boolean {
  if (typeof answer === "number") {
    return (choicedNumber === answer);
  } else {
    console.log(choicedSet, answer);
    return choicedSet.size === answer.size && (new Set([...choicedSet, ...answer])).size === answer.size;
  }
}

