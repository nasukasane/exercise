import { Select } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { Section } from './main'

function ProblemList({ props: { sectionCount, sections, } }: {
  props: {
    sectionCount: number,
    sections: Section[],
  }
}) {
  return (
    <div className="w-full max-w-md mx-auto ">
      <div className="relative">
        <Select
          className={clsx(
            'mt-3 block w-full appearance-none rounded-lg border-gray-500 bg-white/5 py-1.5 px-3 text-sm/6 text-gray-900',
            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
            // Make the text of each option black on Windows
            '*:text-black'
          )}
        >
          <option key={-2}>{sections[sectionCount].name}</option>
          <option key={-1}>選択した問題に移動</option>
          {sections.map((section, s) => {
            return (
              <option key={s} className=''>{section.name}</option>
            )
          })}
        </Select>
        <ChevronDownIcon
          className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
          aria-hidden="true"
        />
      </div>
    </div>
  )
}

export default function ProblemHeader({ props: {sectionCount, sections} }: {
  props: {
    sectionCount: number,
    sections: Section[],
  }
}) {
  return (
    <div>
      <ProblemList props={ {sectionCount, sections} } />
    </div>
  )
}
