import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon, ChevronRightIcon, QuestionMarkCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { CheckTables, Section } from './main'
import { CheckCircleIcon } from '@heroicons/react/16/solid'

function ProblemMenu({ props: { sectionCount, sections, checkTables, jumpSection} }: {
  props: {
    sectionCount: number,
    sections: Section[],
    checkTables: CheckTables,
    jumpSection: (sectionNumber: number)=>void,
  }
}) {
  return (
    <div className="text-center">
      <Menu>
        <MenuButton 
          className="inline-flex items-center w-full max-w-[500px] gap-2 rounded-md  mx-auto
           bg-gray-200 py-1.5 px-3 text-sm/6 font-semibold text-gray-800 
           focus:outline-none data-[hover]:bg-gray-300 data-[open]:bg-gray-400
           border-gray-700 border
           data-[focus]:outline-1 data-[focus]:outline-gray-700">
          {sections[sectionCount].name}
          <ChevronDownIcon className="size-4 fill-gray-800" />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom start"
          className="rounded-xl border max-w-[500px] border-gray-600 bg-white p-1 text-sm/6 
           transition duration-100 ease-out [--anchor-gap:var(--spacing-1)]
           focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <MenuItem key={-1}>
            <div>
              選択した問題に移動<hr className='border-gray-500'/>
            </div>
          </MenuItem>
          {sections.map((section, sectionNumber) => {
            return (
              <MenuItem key={sectionNumber}>
                <button onClick={()=>{jumpSection(sectionNumber)}}
                  className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3
                 data-[focus]:bg-blue-200 content-center">
                  <div className="w-[20px]" >{sectionCount === sectionNumber && <ChevronRightIcon className='w-5'/>}</div>
                  <div className="w-[380px] text-left">{section.name}</div>
                  <div className="w-[100px] text-left flex">
                    {checkTables[sectionNumber].map((check, i)=>{
                      if      (check==='N'){
                        return (
                        <div className='inline w-6' key={i+10}>
                          <QuestionMarkCircleIcon />
                        </div>)}
                      else if (check==='C'){
                        return (
                        <div className='inline w-6 text-green-600' key={i+10}>
                          <CheckIcon />
                          </div>)}
                      return (<div className='inline w-6 text-red-600' key={i+10}>
                        <XMarkIcon />
                        </div>)
                    })}
                  </div>
                </button>
              </MenuItem>
            )
          })}
        </MenuItems>
      </Menu>
    </div>

  )
}

export default function ProblemHeader({ props: { sectionCount, sections, checkTables, jumpSection } }: {
  props: {
    sectionCount: number,
    sections: Section[],
    checkTables: CheckTables,
    jumpSection: (sectionNumber:number)=>void,
  }
}) {
  return (
    <div>
      <ProblemMenu props={{ sectionCount, sections, checkTables, jumpSection }} />
    </div>
  )
}
