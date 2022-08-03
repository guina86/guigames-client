import { useEffect, useState } from 'react'
import xor from 'lodash.xor'
import { ParsedUrlQueryInput } from 'querystring'
import { Close, FilterList } from '@styled-icons/material-outlined'
import Button from 'components/Button'
import Checkbox from 'components/Checkbox'
import Heading from 'components/Heading'
import Radio from 'components/Radio'
import * as S from './styles'

export type Field = {
  label: string
  name: string
}

export type ItemProps = {
  title: string
  name: string
  type: string
  fields: Field[]
}

export type Values = ParsedUrlQueryInput

export type ExploreSidebarProps = {
  filterItems: ItemProps[]
  initialValues?: Values
  onFilter: (values: Values) => void
}

const ExploreSidebar = ({ filterItems, initialValues = {}, onFilter }: ExploreSidebarProps) => {
  const [values, setValues] = useState(initialValues)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    onFilter(values)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values])

  const handleRadio = (name: string, value: string | boolean) => {
    setValues((old) => ({ ...old, [name]: value }))
  }

  const handleCheckbox = (name: string, value: string) => {
    const currentList = (values[name] as []) || []

    setValues((old) => ({ ...old, [name]: xor(currentList, [value]) }))
  }

  const handleFilterMenu = () => {
    setIsOpen(false)
  }

  return (
    <S.Wrapper isOpen={isOpen}>
      <S.Overlay aria-hidden={isOpen} />
      <S.IconWrapper>
        <FilterList aria-label="open filters" onClick={() => setIsOpen(true)} />
        <Close aria-label="close filters" onClick={() => setIsOpen(false)} />
      </S.IconWrapper>

      <S.Content>
        {filterItems.map((item) => (
          <S.Category key={item.title}>
            <Heading lineColor="secondary" size="small" lineBottom>
              {item.title}
            </Heading>
            {item.type === 'checkbox'
              ? item.fields.map((field) => (
                  <Checkbox
                    key={field.name}
                    name={field.name}
                    label={field.label}
                    isChecked={(values[item.name] as string[])?.includes(field.name)}
                    onCheck={() => handleCheckbox(item.name, field.name)}
                  />
                ))
              : item.fields.map((field) => (
                  <Radio
                    key={field.name}
                    name={item.name}
                    label={field.label}
                    value={field.name}
                    defaultChecked={String(field.name) === String(values[item.name])}
                    onChange={() => handleRadio(item.name, field.name)}
                  />
                ))}
          </S.Category>
        ))}
      </S.Content>
      <S.Footer>
        <Button size="medium" fullWidth onClick={handleFilterMenu}>
          Filter
        </Button>
      </S.Footer>
    </S.Wrapper>
  )
}

export default ExploreSidebar
