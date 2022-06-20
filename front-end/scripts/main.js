const notify = (type, message, timeout) => {
    let x;
    if (type == 'succes') {
        x = `<div class="notify ${type}"><i class="far fa-check-circle"></i>${message}<div class="notify-loadingbar loading-${type}"></div></div>`
        
    } else if(type == 'error') {
        x = `<div class="notify ${type}"><i class="fas fa-times"></i>${message}<div class="notify-loadingbar loading-${type}"></div></div>` 
    } else if (type == 'info') {
        x = `<div class="notify ${type}"><i class="fas fa-info-circle"></i>${message}<div class="notify-loadingbar loading-${type}"></div></div>` 

    }

    $("body").append(x)
    $(".notify").animate({
        right: 2 + "%"
    }, 1000, () => {
        document.querySelector(".notify-loadingbar").style ? document.querySelector(".notify-loadingbar").style.animation = `notify-loadinganim forwards ${timeout}ms` : null
    });

    setTimeout(() => {
        $(".notify").animate({
            right: -15 + "%",
        }, 1000, () => {
            document.querySelector(".notify-loadingbar").style.animation = ``;
            $(".notify").remove()
        }); 
    }, parseInt(timeout))
}