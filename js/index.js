window.addEventListener('load', function () {
    //1.显示与隐藏箭头
    var focus = document.querySelector('.focus');
    var arrow_l = focus.querySelector('.arrow-l');
    var arrow_r = focus.querySelector('.arrow-r');
    focus.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer_auto);
        timer_auto = null
    })
    focus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer_auto = setInterval(function () {
            arrow_r.click()
        }, 2000)
    })

    //2.动态生成小圆圈
    var ul = focus.querySelector('ul');
    var circle = focus.querySelector('.circle');
    var cur_index = 0;
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        li.setAttribute('data-index', String(i))
        li.addEventListener('click', function () {
            if (cur_index == ul.children.length - 1) {
                cur_index = 0;
                ul.style.left = 0
            }
            circle.children[cur_index].className = '';
            cur_index = parseInt(this.getAttribute('data-index'));
            circle.children[cur_index].className = 'current';
            animate(ul, -cur_index * focus.clientWidth)
        })
        circle.appendChild(li)
    }
    circle.children[cur_index].className = 'current';

    //3.按钮
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    var flag = true; //节流阀
    arrow_r.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (cur_index == ul.children.length - 1) {
                ul.style.left = 0;
                cur_index = 0
            }
            circle.children[cur_index].className = '';
            cur_index += 1;
            circle.children[cur_index == ul.children.length - 1 ? 0 : cur_index].className = 'current';
            animate(ul, -cur_index * focus.clientWidth, function () {
                flag = true
            });
        }
    })
    arrow_l.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (cur_index == 0) {
                circle.children[cur_index].className = '';
                cur_index = ul.children.length - 1;
                ul.style.left = -cur_index * focus.clientWidth + 'px';
            } else if (cur_index == ul.children.length - 1) {
                circle.children[0].className = ''
            } else {
                circle.children[cur_index].className = ''
            }
            cur_index -= 1;
            circle.children[cur_index].className = 'current';
            animate(ul, -cur_index * focus.clientWidth, function () {
                flag = true
            })
        }
    })
    //自动轮播
    var timer_auto = this.setInterval(function () {
        arrow_r.click()
    }, 2000)
})
