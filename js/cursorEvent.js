AFRAME.registerComponent("cursor-listener",{
    schema: {
        selectedItemId: { default: "", type: "string" },
      },
    init:function(){
        this.handleMouseEnterEvent();
        this.handleMouseLeaveEvent();
        this.handleClickEvent();
    },

    handleClickEvent:function(){
      this.el.addEventListener("click", evt=>{
        const placesContainer = document.querySelector("#places-container")

        const { state } = placesContainer.getAttribute("thumbnail");

        if (state === "places-list") {
  
          const id = this.el.getAttribute("id");
  
          const placesId = [
            "tiger",
            "spider",
            "lizard",
            "butterfly"
          ];
  
          if (placesId.includes(id)) {
            placesContainer.setAttribute("thumbnail", {
              state: "view",
              selectedCard: id
            });
          }
        }
        if(state === "view"){
          this.handleViewState();
        }

      })
    },


    handleMouseEnterEvent:function(){
        this.el.addEventListener("mouseenter",()=>{
            const id = this.el.getAttribute("id");
            const animal = ["tiger","spider","lizard","butterfly"];
            if(animal.includes(id)){
                const placeContainer = document.querySelector("#places-container");
                placeContainer.setAttribute("cursor-listener", {
                  selectedItemId: id,
                });
                this.el.setAttribute("material",{
                    color:"purple",
                    opacity:1
                })
            } 
        })
    },

    handleMouseLeaveEvent:function(){
        this.el.addEventListener("mouseleave",() => {
            const {selectedItemId} = this.data
            if(selectedItemId){
              const el = document.querySelector(`#${selectedItemId}`)
              const id = el.getAttribute("id")
              if(id==selectedItemId){
                el.setAttribute("material",{
                  color:"black",
                  opacity:1
                })
              }
            }
          });
    },

  
    handleViewState:function(){
      const el = this.el;
      const id = el.getAttribute("id");
      const placeContainer = document.querySelector('#places-container');

      const {selectedItemId} = placeContainer.getAttribute("cursor-listener");

      const skyEL = document.querySelector("#sky")

      skyEL.setAttribute("material",{color:"pink"})
    }
})