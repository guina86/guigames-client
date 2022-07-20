import { Close, FilterList } from '@styled-icons/material-outlined'
import Button from 'components/Button'
import Checkbox from 'components/Checkbox'
import Heading from 'components/Heading'
import Radio from 'components/Radio'
import { useState } from 'react'
import * as S from './styles'

type Field = {
  label: string
  name: string
}

export type Category = {
  title: string
  name: string
  type: 'checkbox' | 'radio'
  fields: Field[]
}

export type Values = {
  [field: string]: boolean | string
}

export type ExploreSidebarProps = {
  categories: Category[]
  initialValues?: Values
  onFilter: (values: Values) => void
}

const ExploreSidebar = ({ categories, initialValues = {}, onFilter }: ExploreSidebarProps) => {
  const [values, setValues] = useState(initialValues)
  const [isOpen, setIsOpen] = useState(false)

  const handleChange = (name: string, value: string | boolean) => {
    setValues((old) => ({ ...old, [name]: value }))
  }

  const handleFilter = () => {
    onFilter(values)
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
        {categories.map((category) => (
          <S.Category key={category.title}>
            <Heading lineColor="secondary" size="small" lineBottom>
              {category.title}
            </Heading>
            {category.type === 'checkbox'
              ? category.fields.map((field) => (
                  <Checkbox
                    key={field.name}
                    name={field.name}
                    label={field.label}
                    isChecked={!!values[field.name]}
                    onCheck={(value) => handleChange(field.name, value)}
                  />
                ))
              : category.fields.map((field) => (
                  <Radio
                    key={field.name}
                    name={category.name}
                    label={field.label}
                    value={field.name}
                    defaultChecked={field.name === values[category.name]}
                    onChange={() => handleChange(category.name, field.name)}
                  />
                ))}
          </S.Category>
        ))}
      </S.Content>
      <S.Footer>
        <Button size="medium" fullWidth onClick={handleFilter}>
          Filtrar
        </Button>
      </S.Footer>
    </S.Wrapper>
  )
}

export default ExploreSidebar
