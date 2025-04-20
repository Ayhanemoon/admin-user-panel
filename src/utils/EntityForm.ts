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
      grid: any;
      options?: { label: string; value: string }[]; // Optional, for fields like 'select' or 'radio'
    };
  };
};

export const entityFormFields: EntityFormFields = {
  users: {
    username: { type: 'text', label: 'نام کاربری', required: true, defaultValue: '', grid:{xs:12, sm:3} },
    email: { type: 'text', label: 'ایمیل', required: true, defaultValue: '', grid:{xs:12, sm:3} },
    password: { type: 'text', label: 'رمز عبور', required: true, defaultValue: '', grid:{xs:12, sm:3} },
    firstName: { type: 'text', label: 'نام', required: true, defaultValue: '', grid:{xs:12, sm:3} },
    lastName: { type: 'text', label: 'نام خانوادگی', required: true, defaultValue: '', grid:{xs:12, sm:3} },
    role: { type: 'select', label: 'نقش دسترسی', required: true, defaultValue: '', grid:{xs:12, sm:3}, options: [{ label: 'Admin', value: 'admin' }, { label: 'User', value: 'user' }] },
    birthDate: {type: 'date', label: 'تاریخ تولد', required: true, defaultValue: '', grid:{xs:12, sm:3}},
    phone: { type: 'text', label: 'شماره تماس', required: true, defaultValue: '', grid:{xs:12, sm:3} },
    address: { type: 'textarea', label: 'آدرس', required: false, defaultValue: '', grid:{xs:12, sm:6} },
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

