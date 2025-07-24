export interface IFieldTypeDefinition{
    type: string,
    label: string,
    icon: string
}

export interface FormField{
    id: string,
    type: string,
    label: string,
    required :string
}

export interface FormRow{
    id: string,
    fields: FormField[]
}