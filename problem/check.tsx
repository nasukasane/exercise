import { Dispatch, SetStateAction } from "react"
import { CheckTable, CheckTables, ChoiceTables } from "./main"

export function Checks({ checkTable }: { checkTable: CheckTable }) {
  return (
    <div className="text-xl">
      {checkTable.map((check, index) => {
        if (check === 'N') {
          return (<div key={index} className="inline">-</div>)
        } else if (check === 'C') {
          return (<div key={index} className="inline text-green-600">o</div>)
        } else if (check === 'W') {
          return (<div key={index} className="inline text-red-600">x</div>)
        }
        return check
      })}
    </div>
  )
}

export function updateCheckTable(
  result: boolean,
  sectionCount: number,
  problemCount: number,
  checkTables: CheckTables, 
  setCheckTables: Dispatch<SetStateAction<CheckTables>>) {
  // checkTable更新
  setCheckTables(checkTables.map((checkTable, i) => {
    if (i === sectionCount) {
      return checkTable.map((check, j) => {
        if (j === problemCount) {
          return (result ? 'C' : 'W');
        } else {
          return check;
        }
      });
    } else {
      return checkTable
    }
  }));
}

