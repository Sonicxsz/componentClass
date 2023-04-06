 class Component {
    constructor(tagname,{classes = [], styles = [], text = '', listeners = []}){
        if(typeof tagname === 'string'){
            this.elem = document.createElement(tagname)
            this.setClass(classes)
            this.setStyle(styles)
            this.setListener(listeners)

            this.elem.textContent = text
            this.render()

        }else{
            throw new Error('invalid value use string')
        }
    }

    setStyle(styles){
        this.elem.style = styles  
        return this   
    }

    setClass(classes){
        if(Array.isArray(classes)){
            this.elem.classList.add(...classes)
        }else{
            this.elem.classList.add(classes)
        }
        return this
    }

    setListener(listener){
        if(Array.isArray(listener)){
            listener.forEach(list => {
                this.elem.addEventListener(list.event, list.fn)
            })
        }else{
            this.elem.addEventListener(listener.event, listener.fn)
        }
        return this
    }

    removeLister({event, fn}){
        this.elem.removeEventListener(event, fn)
        return this
    }

    render(root = 'body'){
        document.querySelector(root).appendChild(this.elem)
        return this
    }
    destroy(){
        this.elem.remove()
        return this
    }
}



const button = new Component('button', {classes: [], styles:'width: 200px', text:'sometext', listeners: [{event:'mouseover', fn: handleHover}]});
const div = new Component('div', {classes: 'box', listeners: {event: 'click', fn: (e) => e.target.classList.toggle('red')}})
const p = new Component('p', {text: 'hello world'})


button.destroy()
button.render('#root')




function handleHover(){
    return console.log('hover')
}