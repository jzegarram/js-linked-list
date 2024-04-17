import { Node } from './node';

export class LinkedList {
  constructor(){
      this.head=null;
  }

  #getNodeByCode(code) {
    let temp=this.head;
    while(temp!=null){
      if(temp.data.code==code) {
        return temp;
      }
      temp = temp.next;
    }
    return null;
  }

  getByCode(code) {
    return this.#getNodeByCode(code)?.data ?? null;
  }

  addFirst(data){
      const newNode = new Node(data)
      newNode.next = this.head;
      this.head = newNode;
  }

  deleteByCode(code){
    let temp=this.head;
    while(temp!=null && temp.next!=null){
      if(temp.next.data.code==code){
        const found_data=temp.next.data;
        if(temp.next.next!=null){
          temp.next=temp.next.next;
        }
        else {
          temp.next=null;
        }
        return found_data;
      }
      temp=temp.next;
    }
    return null
  }

  deleteAll() {
    head = null
  }

  removeFirst() {
    if (!this.head) {
      return
    }
    this.head = this.head.next
  }

  removeLast() {
    let temp = this.head
    if (!temp) return

    while (temp.next != null && temp.next.next != null) {
      temp = temp.next
    }

    temp.next = null
  }

  insertAt(i, data) {
    let temp = this.head

    while (i-- && temp.next != null) {
      temp = temp.next
    }

    temp.next = new Node(data)
  }

  getAllEmployees() {
    let temp = this.head

    if (temp == null) {
      return []
    }

    let dataArr = [temp.data]

    while (temp.next != null) {
      dataArr.push(temp.next.data)
      temp = temp.next
    }

    return dataArr
  }

  updateEmployee(code, data){
    let node = this.#getNodeByCode(code);
    node.data=data;
  }
}
