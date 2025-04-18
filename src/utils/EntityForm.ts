export type FieldType =
  | 'text'
  | 'number'
  | 'switch'
  | 'date'
  | 'select'
  | 'file'
  | 'radio'
  | 'textarea'
  | 'checkbox';
  
export type EntityFormFields = {
  [entity: string]: {
    [field: string]: {
      type: FieldType;
      label: string;
      required: boolean;
      defaultValue: any;
      options?: { label: string; value: string }[]; // Optional, for fields like 'select' or 'radio'
    };
  };
};

export const entityFormFields: EntityFormFields = {
  users: {
    username: { type: 'text', label: 'نام کاربری', required: true, defaultValue: '' },
    email: { type: 'text', label: 'ایمیل', required: true, defaultValue: '' },
    password: { type: 'text', label: 'رمز عبور', required: true, defaultValue: '' },
    role: { type: 'select', label: 'نقش دسترسی', required: true, defaultValue: '', options: [{ label: 'Admin', value: 'admin' }, { label: 'User', value: 'user' }] },
    firstName: { type: 'text', label: 'نام', required: true, defaultValue: '' },
    lastName: { type: 'text', label: 'نام خانوادگی', required: true, defaultValue: '' },
    phone: { type: 'text', label: 'تلفن', required: true, defaultValue: '' },
    address: { type: 'textarea', label: 'آدرس', required: false, defaultValue: '' },
  },
};

const entityLabels: { [key: string]: { singular: string; plural: string } } = {
  users: {
    singular: 'کاربر',
    plural: 'کاربران',
  }
};

export const getEntityLabel = (entity: string, type: 'singular' | 'plural') => {
  return  entityLabels[entity]?.[type] || entity;
}

export const getEntityFormFields = (entity: string) => {
  return entityFormFields[entity] || {};
}

