export type FiltersType = {
  whom: { pensioners: boolean; eldersHome: boolean };
  how: { items: boolean; finance: boolean };
};

export type FilterType = keyof FiltersType;

export type FilterWhomType = Pick<FiltersType, 'whom'>['whom'];
export type FilterHowType = Pick<FiltersType, 'how'>['how'];
