import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  header: HeaderItem[];
  items: any[];
  columns: string[];

  ngOnInit() {
    this.header = [
      new HeaderItem('Id', ColunmType.text, new Filter('Product.Id', FilterType.Contains)),
      new HeaderItem('Name', ColunmType.number, new Filter('Product.Name', FilterType.Contains)),
      new HeaderItem('Price', ColunmType.text, new Filter('Product.Price', FilterType.Contains), true, MaskType.money),
      new HeaderItem('Quantity', ColunmType.select, new Filter('Product.Quantity', FilterType.Contains))
    ];

    this.items = [
      { id: 1, name: 'DWF Writer', price: '12,22', quantity: '5' },
      { id: 2, name: 'Cadmep', price: '15,54', quantity: '6' },
      { id: 3, name: 'SketchBook', price: '25,55', quantity: '1' },
      { id: 4, name: 'Tinkercad', price: '254,36', quantity: '23' },
    ];

    this.columns = this.header.map(item => item.name.toLowerCase());
  }

  getFilters() {
    const filters = this.header.map(item => item.filter);
    console.log(JSON.stringify(filters));
  }

  orderBy(id: string, asc: boolean) {
    this.header.find(item => item.id == id).asc = !asc;
  }

  onChangeFilter() {
  }

  isInput(type: ColunmType) {
    return type !== ColunmType.select;
  }

  getValue(value: any, column: string) {
    const item = this.header.find(item => item.name.toLowerCase() == column);

    if(item && item.mask) {
      if(item.mask === MaskType.money){
        return 'R$ ' + value;
      }
    }

    return value;
  }
}

export class Filter {
  field: string;
  type: FilterType;
  value: any;

  constructor(field: string, type: FilterType, value: any = null) {
    this.field = field;
    this.type = type;
    this.value = value;
  }
}

export class HeaderItem {
  id: string;
  name: string;
  type: ColunmType;
  filter: Filter;
  mask: MaskType;
  asc: boolean;

  filters: any[];

  constructor(name: string, type: ColunmType, filter: Filter, asc = true, mask: MaskType = null) {
    this.id = Guid.newGuid();
    this.name = name;
    this.type = type;
    this.mask = mask;
    this.asc = asc;
    this.filter = filter;
    this.filters = this.getFiltersByType(this.type);
  }

  getFiltersByType(type: ColunmType) {
    switch (type) {
      case ColunmType.text:
        return this.filtersString;

      case ColunmType.number:
        return this.filterNumber;
    }
  }

  filtersString = [
    { "key": 1, "name": '⊃' },
    { "key": 2, "name": '=' },
    { "key": 3, "name": '≠' },
    { "key": 12, "name": '→a' },
    { "key": 13, "name": 'a←' }
  ];

  filterNumber = [
    { "key": 4, "name": '>' },
    { "key": 5, "name": '<' },
    { "key": 6, "name": '≥' },
    { "key": 7, "name": '≤' },
    { "key": 8, "name": '=' },
    { "key": 9, "name": '≠' }
  ];
}

export enum ColunmType {
  text = 0,
  number = 1,
  select = 2,
}

export enum MaskType {
  money = 1,
  cnpj = 2,
  cpf = 3,
}

export enum FilterType {
  Contains = 1,
  EqualsText = 2,
  DifferentText = 3,
  Large = 4,
  Small = 5,
  LargeEquals = 6,
  SmallEquals = 7,
  EqualsNumber = 8,
  DifferentNumber = 9,
  EqualsDate = 10,
  ReachDate = 11,
}

export class Guid {
  static newGuid() {
    var d = new Date().getTime();
    if (Date.now) {
      d = Date.now();
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  };
}