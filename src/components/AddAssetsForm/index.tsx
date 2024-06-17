import { useCallback, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import Button from '@/components/ui/Button'
import Select, { ISelect } from '@/components/ui/Select'
import { useGetMarketsQuery } from '@/services/markets'
import { portfolioSlice } from '@/store/portfolio'
import { IPortfolio } from '@/types/portfolio'

interface IAddAssetForm {
  name: string
}

export default function AddAssetForm() {
  const dispatch = useDispatch()
  const { data: markets } = useGetMarketsQuery()
  const {
    control,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm<IAddAssetForm>({
    defaultValues: { name: '' },
  })

  const marketOptions = useMemo((): ISelect['options'] => {
    return (
      markets?.map((market) => ({
        value: market.name,
        label: market.name,
      })) ?? []
    )
  }, [markets])

  const addPortfolio = useCallback(
    (name: IPortfolio) => {
      dispatch(portfolioSlice.actions.addPortfolio(name))
    },
    [dispatch],
  )

  const onSubmit = (values: IAddAssetForm) => {
    addPortfolio(values.name)
    setValue('name', '')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
      <Controller
        control={control}
        name="name"
        rules={{
          required: 'Please enter your asset',
        }}
        render={({ field: { onChange, value } }) => (
          <Select
            placeholder="Add your assets"
            options={marketOptions}
            value={value}
            onSelect={onChange}
            width={240}
            autoComplete="off"
            errors={errors.name?.message}
            size="sm"
          />
        )}
      />
      <Button type="submit" size="sm">
        Add
      </Button>
    </form>
  )
}
