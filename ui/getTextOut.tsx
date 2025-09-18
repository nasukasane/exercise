import { OutSize, OutType, TextOut } from "@/services/type"
import { BlockMath } from "react-katex"
import { InlineMath } from "react-katex"

export default function GetTextOut({ props }: {
  props: {
    type: OutType, size: OutSize, text: string
  }
}) {
  const { type, size, text } = props;
  if (type === 'mathi') {
    const textSize =
      size === 'ss' ? 'text-xs md:text-base' :
      size === 's' ? 'text-sm md:text-lg' : 'text-base md:text-xl'
    return (
      <div className={`${textSize}`}>
        <InlineMath math={text} />
      </div>
    )
  } else if (type === 'mathb') {
    const textSize =
      size === 'ss' ? 'text-xs md:text-sm' :
      size === 's' ? 'text-xs md:text-base' : 'text-sm md:text-lg'
    return (
      <div className={textSize}>
        <BlockMath math={text} />
      </div>
    )
  } else if (type === 'string') {
    const textSize =
      size === 'ss' ? 'text-xs md:text-base' :
      size === 's' ? 'text-sm md:text-lg' : 'text-base md:text-xl'
    return (
      <div className={textSize}>
        {text}
      </div>
    )
  }
  return <></>
}


