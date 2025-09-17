import { OutSize, OutType, TextOut } from "@/services/type"
import { BlockMath } from "react-katex"
import { InlineMath } from "react-katex"

export default function GetTextOut({ props }: {
  props: {
    type: OutType, size: OutSize, text: string
  }
}) {
  const { type, size, text } = props;
  const textSize =
    size === 'ss' ? 'text-xs md:text-base' :
      size === 's' ? 'text-sm md:text-xl' : 'text-base md:text-2xl'
  if (type === 'mathi') {
    return (
      <div className={`${textSize}`}>
        <InlineMath math={text} />
      </div>
    )
  } else if (type === 'mathb') {
    return (
      <div className={textSize}>
        <BlockMath math={text} />
      </div>
    )
  } else if (type === 'string') {
    return (
      <div className={textSize}>
        {text}
      </div>
    )
  }
  return <></>
}


