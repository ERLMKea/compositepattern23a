class Document {
    constructor(title) {
        this.title = title
        this.signature = null
        this.parent = null
    }

    sign(signature) {
        this.signature = signature;
    }

    out() {
        console.log("Im a Document title= " + this.title + " parent= " + this.parent.title + this.out2())
    }

    out2() {
        return this.signature ? " signed by= " + this.signature : ""
    }

    remove() {
        this.parent.removeMe(this.title)
    }
}

class DocumentComposite {
    constructor(title) {
        this.title = title;
        this.items = []
        this.parent = null
    }
    add(item) {
        item.parent = this
        this.items.push(item)
    }
    sign(signature) {
        this.signature = signature;
        this.items.forEach(item => item.sign(signature));
    }
    out() {
        console.log("I am Composite title= " + this.title + " parent= " + this.parent.title +  this.out2())
        this.items.forEach((item) => item.out())
    }
    out2() {
        return  this.signature ? " signed by= " + this.signature  : ""
    }
    removeMe(title) {
        this.items = this.items.filter(item => item.title != title)
    }
    remove() {
        this.parent.removeMe(this.title)
    }

}
console.log("START ROOT")
const root = new DocumentComposite("root")
root.parent = root
//root.out()

const physical = new DocumentComposite("physical")
const medical = new DocumentComposite("medical")
root.add(medical)
root.add(physical)

const phys1 = new Document("I'm phys1")
const phys2 = new Document("I'm phys2")
physical.add(phys1)
physical.add(phys2)
phys1.sign("ERIK")
root.sign("KURT")
physical.remove()
root.out()


