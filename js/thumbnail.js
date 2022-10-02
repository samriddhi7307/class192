AFRAME.registerComponent("thumbnail",{
    schema: {
        state: { type: "string", default: "places-list" },
        selectedCard: { type: "string", default: "#card1" },
        zoomAspectRatio: { type: "number", default: 1 }
    },
    init:function(){
        this.placesContainer = this.el;
        this.createcard();
    },

    tick:function(){
        const { state } = this.el.getAttribute("thumbnail");
        if(state === "view"){
            this.hideEL([this.placesContainer]);
            this.showView();
        }
    },

    createcard:function(){
        const thumbnailRef=[
            {
                id:"tiger",
                title:"TIGER",
                url:"./assets/tiger.jpg"
            },
            {
                id:"lizard",
                title:"LIZARD",
                url:"./assets/lizard.jpg"
            },
            {
                id:"spider",
                title:"SPIDER",
                url:"./assets/spider.jpg"
            },
            {
                id:"butterfly",
                title:"BUTTERFLY",
                url:"./assets/butterfly.jpg"
            },
        ];
        let prevoiusXPosition = -60;

        for(var item of thumbnailRef){
            const posX = prevoiusXPosition +25;
            const posY = 10;
            const posZ = -40;
            const position = {x:posX, y:posY, z:posZ};
            prevoiusXPosition = posX;
            const borderEl = this.createBorder(position, item.id);
            const titleEl = this.createTitle(position,item);

            const thumbnail = this.createThumbNail(item);
            borderEl.appendChild(thumbnail)
            borderEl.appendChild(titleEl);
            this.placesContainer.appendChild(borderEl);


        }
    },

    createBorder:function(position, id){
        const entityEL=document.createElement("a-entity");
        entityEL.setAttribute("cursor-listener",{})
        entityEL.setAttribute("id",id);
        entityEL.setAttribute("position",position);
        entityEL.setAttribute("visible", true);
        entityEL.setAttribute("geometry",{
            primitive:"ring",
           // width:"15",
            //height:"15",
            //depth:"0.01"
            radiusInner:"9",
            radiusOuter:"10"
        });
        entityEL.setAttribute("material",{color:"black",opacity:1})

        return entityEL;
    },

    createThumbNail:function(item){
        const entityEL = document.createElement("a-entity");
        entityEL.setAttribute("visible",true);
        entityEL.setAttribute("geometry",{
            primitive:"circle",
            //width:"10",
            //height:"10",
            //depth:"0.1"
            radius:9
        });
        entityEL.setAttribute("material",{src: item.url});

        return entityEL;
    },

    createTitle:function(position,item){
        const entityEL = document.createElement("a-entity");
        entityEL.setAttribute("text",{
            value:item.title,
            align:"center",
            font:"exo2bold",
            width:70,
            color:"black"
        });

        const pos= position;
        pos.y = -20;
        entityEL.setAttribute("position",pos);
        entityEL.setAttribute("visible",true);

        return entityEL;
    },

    hideEL:function(ELlist){
        ELlist.map(el =>{
            el.setAttribute("visible",false);
        })
    },

    showView:function(){
        const {selectedCard} = this.data;
        const skyEL = document.querySelector("#sky");
        skyEL.setAttribute("material",{
            color:"black"
        })
        if(selectedCard == "tiger"){
            const entityEl = document.createElement("a-entity");
            entityEl.setAttribute("text",{
                value:"tiger is a animal.",
                align:"center",
                font:"exo2bold",
                width:100,
                color:"yellow"
            })
            entityEl.setAttribute("posiiton",{
                posX:0,
                posY:0,
                posZ:-20
            })
        }
    }

})