/* Original SVG settings for Harshit Sati's poems. Decorative artwork only.
   Timelines exist only while the reader is open; no external assets or new libraries. */
(() => {
  'use strict';
  const settings = {
    'koshish': { name: 'A garden before the first word', bg: '#201b25', sky: '#403040', accent: '#dfaaa9', paper: '#efe2df', scene: 'garden' },
    'fursat': { name: 'Where the moon meets the water', bg: '#13242b', sky: '#245363', accent: '#b0d3d3', paper: '#e3eded', scene: 'lake' },
    'aadha-adhura': { name: 'The lane that remembers', bg: '#181e2c', sky: '#343d5b', accent: '#c2c9de', paper: '#e7e6ef', scene: 'lane' },
    'dastaan': { name: 'An open sky, an unfinished story', bg: '#19272d', sky: '#425f6d', accent: '#c7d6d4', paper: '#e6e9e1', scene: 'birds' },
    'phir-se': { name: 'A window into another beginning', bg: '#2a2028', sky: '#71515d', accent: '#e7bda8', paper: '#f0e2d7', scene: 'window' },
    'shab-e-chahat': { name: 'One rooftop, a thousand glances', bg: '#1b202d', sky: '#3d4765', accent: '#d8c8ae', paper: '#e9e5e2', scene: 'rooftop' },
    'radha-kanha': { name: 'A few moments in another world', bg: '#122a2b', sky: '#235351', accent: '#d5c58e', paper: '#e8ebda', scene: 'lotus' },
    'musafir': { name: 'A light beyond the dunes', bg: '#28212a', sky: '#5c4654', accent: '#e0be8f', paper: '#f0e4d1', scene: 'desert' },
    'ek-khwais': { name: 'The story that almost wasn’t', bg: '#272525', sky: '#50494a', accent: '#d6c6b1', paper: '#eee6dc', scene: 'pages' }
  };

  const path = (d, extra = '') => `<path d="${d}" ${extra}/>`;
  const moon = (x = 960, y = 170, r = 45) => `<g data-breathe><circle cx="${x}" cy="${y}" r="${r * 2.7}" fill="url(#scene-halo)"/><circle cx="${x}" cy="${y}" r="${r}" fill="#eee2c9" opacity=".92"/><circle cx="${x + r * .3}" cy="${y - r * .2}" r="${r * .54}" fill="#c8b79f" opacity=".2"/></g>`;
  const stars = (warm = false) => `<g fill="${warm ? '#e0c397' : '#d4dbdf'}">${Array.from({length: 25}, (_, i) => {
    const x = 540 + ((i * 139 + 47) % 630), y = 28 + ((i * 73 + 17) % 400);
    return `<circle data-glimmer cx="${x}" cy="${y}" r="${i % 5 ? 1.2 : 2.2}" opacity="${.22 + (i % 4) * .12}"/>`;
  }).join('')}</g>`;
  const petal = (x, y, rotate = 0, scale = 1, color = '#d3a4a7') => `<g transform="translate(${x} ${y}) rotate(${rotate}) scale(${scale})"><path data-float d="M0 0C-16-19-10-34 1-36C18-33 19-12 0 0Z" fill="${color}" opacity=".65"/></g>`;
  const flower = (x, y, scale = 1, color = '#b77d86') => `<g transform="translate(${x} ${y}) scale(${scale})"><g data-sway><g fill="${color}" stroke="#dab4ad" stroke-width=".75" opacity=".85">${Array.from({length:7}, (_, i) => `<ellipse cx="0" cy="-20" rx="13" ry="22" transform="rotate(${i*360/7})"/>`).join('')}</g><circle r="10" fill="#d5b987"/><circle r="4" fill="#594c3d"/></g></g>`;
  const ripple = (x, y, width = 100, delay = 0) => `<ellipse data-ripple data-delay="${delay}" cx="${x}" cy="${y}" rx="${width}" ry="${width*.12}" fill="none" stroke="#c2d5d1" stroke-width="1" opacity=".26"/>`;
  const leaf = (d, color = '#6c8170') => path(d, `fill="${color}" opacity=".8"`);

  function garden() {
    return `${moon(975,155,35)}${stars(true)}
      <g fill="none" stroke="#74816e" stroke-width="2"><path data-ink d="M1195 1000C1030 890 1155 667 989 533S1017 285 1123 304M1086 797C1020 766 973 751 933 688M1087 648C1140 595 1168 572 1200 554M1016 560C943 554 931 512 910 478M995 418C1042 389 1077 379 1097 346"/>
      ${path('M1087 793C1038 739 986 709 943 712C971 767 1014 793 1087 793','fill="#50644f" stroke="none"')}
      ${leaf('M1090 702C1125 650 1146 645 1184 631C1171 677 1143 703 1090 716')}${leaf('M1008 532C955 503 930 488 928 454C966 460 1000 486 1008 532')}
      ${leaf('M1043 873C1005 820 961 822 920 795C933 845 982 875 1043 883')}</g>
      ${flower(1112,335,.95)}${flower(1000,553,.7,'#d2a49b')}${flower(1085,780,1.1)}${flower(1183,596,.6)}
      ${petal(885,250,-25,.6)}${petal(1060,600,33,.48)}${petal(836,770,-60,.65)}${petal(1130,120,45,.42)}
      <path d="M0 968Q340 920 650 962T1200 944V1000H0Z" fill="#111b1a" opacity=".75"/>`;
  }

  function lake() {
    return `${stars()}${moon(960,185,49)}
      <path d="M0 495Q400 520 675 474T1200 490V1000H0Z" fill="#10252d"/>
      <path d="M0 497Q400 523 675 477T1200 493" fill="none" stroke="#547d85" opacity=".55"/>
      <path d="M929 501L997 501L1095 1000H832Z" fill="url(#scene-reflection)" opacity=".48"/>
      <g stroke="#779c9f" stroke-width="1.2" fill="none" opacity=".4"><path data-water d="M715 554Q835 534 1093 550M790 608Q978 587 1170 606M655 697Q833 673 1080 693M770 780Q957 752 1195 775M665 861Q822 839 1084 856M746 934Q1000 909 1200 920"/></g>
      ${ripple(955,634,108)}${ripple(1030,817,137,1.8)}${ripple(787,748,88,3.6)}
      <g stroke="#627c72" fill="none" stroke-width="2"><path d="M1181 1000Q1140 821 1176 661M1147 1000Q1109 887 1120 818M1198 1000Q1214 826 1193 755"/></g>
      ${flower(1176,661,.47,'#d0b7b1')}${flower(1120,823,.38,'#9cb7b2')}`;
  }

  function lane() {
    return `${moon(948,163,34)}
      <path d="M580 1000L903 502L1010 502L1200 1000Z" fill="#242b3a"/>
      <path d="M0 348L744 341L866 494V1000H0Z" fill="#111e29"/>
      <path d="M1200 240L1086 307L1017 501V1000H1200Z" fill="#121a29"/>
      <path d="M866 494L744 341V1000M1017 501L1086 307V1000" stroke="#475261" stroke-width="1.2" fill="none"/>
      <path d="M746 350L868 496M1016 499L1086 307" stroke="#85828b" stroke-width="1.4" opacity=".6"/>
      <g fill="#d9b27e"><path data-glow d="M785 528L826 548V646L785 634Z" opacity=".8"/><path d="M1135 440L1175 427V510L1135 526Z" opacity=".38"/></g>
      <path d="M807 645L917 1000H689Z" fill="url(#scene-reflection)" opacity=".26"/>
      <g fill="none" stroke="#8a929e" opacity=".36"><path d="M754 794L891 794M704 854L922 854M649 933L957 933M890 611L995 611M877 646L1009 646"/></g>
      <path d="M900 491Q934 468 976 488" fill="none" stroke="#73798a" opacity=".6"/>
      <g data-rain stroke="#a6b2c9" opacity=".24">${Array.from({length:22},(_,i)=>{const x=615+(i*73)%580,y=(i*137)%910;return path(`M${x} ${y}l-11 35`);}).join('')}</g>
      ${ripple(893,868,78)}${ripple(1014,930,65,2)}`;
  }

  function birds() {
    return `<circle cx="1000" cy="230" r="215" fill="url(#scene-halo)" opacity=".7"/>
      <g data-cloud opacity=".25" fill="#a5b7bc"><path d="M591 280Q650 219 719 246Q777 163 843 229Q926 195 968 260Q1041 218 1108 285Z"/><path d="M805 481Q862 439 907 453Q982 409 1044 464Q1109 426 1200 481Z" opacity=".5"/></g>
      <path d="M0 860Q326 799 650 851T1200 814V1000H0Z" fill="#223d3f"/><path d="M0 916Q400 863 803 905T1200 870V1000H0Z" fill="#152c2b"/>
      <g data-birds stroke="#d4dbd5" stroke-width="2" fill="none" stroke-linecap="round"><path d="M763 300q13-17 28 0q15-18 31-3M862 265q13-15 23 1q12-16 25-3M971 335q12-12 22 0q12-15 24-3M1035 260q9-13 20 0q10-13 22-2M865 370q9-10 18 0q11-12 22-1"/></g>
      <g transform="translate(1057 672) rotate(-16)"><g data-float><path d="M0 26C54-3 90-8 116 8C81 19 78 46 49 47C24 49 7 34 0 26Z" fill="#c6c2a9" opacity=".72"/><path d="M-22 53Q41 19 103 11M30 30L24 13M52 23L50 7M68 18L72 30" stroke="#777f74" stroke-width="1" fill="none"/></g></g>
      <g stroke="#516b62" fill="none" stroke-width="2"><path d="M1140 1000Q1091 888 1171 801M1122 953Q1079 917 1052 923M1120 931Q1152 888 1172 895"/></g>`;
  }

  function windowScene() {
    return `<path d="M725 1000V337C725 54 1175 54 1175 337V1000Z" fill="#493640" stroke="#967e7c" stroke-width="2"/>
      <path d="M761 1000V340C761 104 1139 104 1139 340V1000Z" fill="url(#scene-sky)" stroke="#bda28e" stroke-width="1.5"/>
      ${moon(996,272,42)}
      <path d="M762 672Q952 610 1139 670V1000H762Z" fill="#3a3541"/><path d="M762 735Q981 675 1139 718V1000H762Z" fill="#282b34"/>
      <path d="M930 672Q890 766 927 1000M981 672Q1062 790 1010 1000" fill="none" stroke="#a28b84" opacity=".3" stroke-width="2"/>
      <g data-curtain><path d="M745 186Q796 370 764 521Q741 697 804 914L763 922L746 971L723 970V337Q723 251 745 186Z" fill="#c6b4aa" opacity=".38"/></g>
      <path d="M707 980H1195V1000H707Z" fill="#8c7470"/>
      ${petal(1020,560,45,.45,'#d3ad9b')}${petal(861,741,-30,.4,'#d3ad9b')}
      <g data-glow fill="#e7bc88" opacity=".55"><circle cx="1073" cy="657" r="2"/><circle cx="1097" cy="652" r="1.5"/><circle cx="1086" cy="681" r="2"/></g>`;
  }

  function rooftop() {
    return `${stars(true)}${moon(993,179,43)}
      <path d="M0 735H698V651H775V713H870V621H955V705H1042V666H1147V731H1200V1000H0Z" fill="#2a303c"/>
      <path d="M772 713V650Q803 614 835 650V713M1100 667V620Q1119 594 1138 620V667" fill="#262b39" stroke="#686875" stroke-width="1.1"/>
      <g data-glow fill="#d6aa75"><path d="M804 665h12v30h-12Z" opacity=".8"/><path d="M903 660h15v27h-15Z" opacity=".45"/><path d="M1078 700h13v24h-13Z" opacity=".6"/></g>
      <path d="M0 898Q566 841 1200 872V1000H0Z" fill="#171f2a"/><path d="M0 898Q566 841 1200 872" stroke="#77747b" opacity=".5" fill="none" stroke-width="3"/>
      <g stroke="#718578" fill="none" stroke-width="1.5"><path d="M1204 564Q1090 451 1127 303T1170 80M1120 386Q1051 324 1048 251M1141 238Q1094 197 1105 143"/></g>
      ${flower(1127,303,.48,'#ac889f')}${flower(1048,251,.35,'#ac889f')}${flower(1106,144,.36,'#c1959e')}
      <g data-cloud opacity=".08" fill="#c3b9b0"><path d="M550 306Q812 242 1034 293T1301 256V300Q1105 362 917 319T550 344Z"/></g>`;
  }

  function lotus() {
    return `${moon(940,175,38)}${stars(true)}
      <path d="M0 657Q560 614 1200 650V1000H0Z" fill="#143733"/>
      <path d="M0 660Q560 616 1200 652" stroke="#638b76" opacity=".35" fill="none"/>
      <g transform="translate(1024 480) rotate(20)"><g data-sway><path d="M0 287C-124 144-123-53-12-195C112-84 143 127 0 287Z" fill="#42695c" stroke="#8d9e70" stroke-width="1.5" opacity=".65"/><path d="M0 300Q17 72-12-180M0 161Q-72 100-84 20M5 98Q75 32 62-47M0 225Q72 179 83 101M-3 20Q-61-24-59-97" stroke="#a5ac77" opacity=".6" fill="none"/>
      <ellipse cx="-8" cy="-47" rx="44" ry="70" fill="#b09f62"/><ellipse cx="-6" cy="-46" rx="30" ry="52" fill="#2f6260"/><ellipse cx="-3" cy="-48" rx="17" ry="32" fill="#182d44"/><ellipse cx="1" cy="-52" rx="6" ry="14" fill="#b8cebe"/></g></g>
      <g transform="translate(870 808)"><g data-float fill="#c7adac" stroke="#ddc9b4" stroke-width="1"><path d="M0 0C-64-13-80-45-77-70C-30-65-12-32 0 0Z"/><path d="M0 0C-28-45-14-81 0-101C30-66 26-34 0 0Z"/><path d="M0 0C56-5 85-43 77-68C33-65 14-32 0 0Z"/><path d="M0 0C-39-2-56-16-57-38C-15-43 12-21 0 0Z"/><path d="M0 0C41 2 61-20 57-39C25-36 10-19 0 0Z"/></g></g>
      ${ripple(870,824,110)}${ripple(1059,921,118,2)}
      <g fill="#decb92">${Array.from({length:9},(_,i)=>`<circle data-firefly cx="${765+i*46}" cy="${367+(i*83)%420}" r="${i%2+1.3}" opacity=".65"/>`).join('')}</g>`;
  }

  function desert() {
    return `${stars(true)}
      <circle data-breathe cx="967" cy="204" r="95" fill="url(#scene-halo)"/>
      <path d="M967 183V226M946 204H988M957 194L977 214M958 214L977 195" stroke="#f0d5a4" stroke-width="1.5"/>
      <path d="M0 642Q432 441 820 628Q1036 717 1200 531V1000H0Z" fill="#635052"/>
      <path d="M0 757Q400 777 700 665Q975 556 1200 700V1000H0Z" fill="#84644f"/>
      <path d="M0 874Q326 755 635 847Q932 940 1200 770V1000H0Z" fill="#543f3a"/>
      <path d="M695 1000Q914 873 959 702Q972 666 1012 640" stroke="#c3a582" fill="none" opacity=".4" stroke-width="2" stroke-dasharray="3 16"/>
      <g transform="translate(1011 638)"><circle cx="0" cy="-20" r="5" fill="#191f27"/><path d="M-5-14L-9 13H10L5-14Z" fill="#222531"/><path d="M-5 10L-9 27M5 10L8 26M5-8L14 3M16-8L14 30" stroke="#242933" stroke-width="3" fill="none"/></g>
      <g data-dust fill="#dab58c" opacity=".3">${Array.from({length:15},(_,i)=>`<circle cx="${658+(i*93)%540}" cy="${550+(i*73)%370}" r="${i%3*.5+.8}"/>`).join('')}</g>`;
  }

  function pages() {
    return `<circle cx="1020" cy="327" r="290" fill="url(#scene-halo)" opacity=".38"/>
      <g transform="translate(928 621) rotate(-14)"><g data-page><path d="M-147-222Q-51-228 14-197Q77-223 171-212V151Q64 138 10 175Q-50 138-151 148Z" fill="#978b7c" opacity=".28" stroke="#c5b7a3" stroke-width="1.5"/><path d="M12-195V170M-128-195Q-47-201-1-178M31-177Q86-199 149-189M-127 127Q-45 117-1 148M32 149Q84 123 151 131" fill="none" stroke="#c1b39e" opacity=".55" stroke-width="1"/>
      <g stroke="#b4a28e" stroke-width="1.1" fill="none" opacity=".5"><path data-ink d="M-114-144Q-67-154-11-137M-113-115Q-56-127-14-110M-114-84Q-64-94-11-77M-114-52Q-79-62-48-54M38-137Q87-157 136-144M37-109Q86-129 136-114M38-78Q75-94 115-83"/></g></g></g>
      <g transform="translate(1076 690) rotate(27)"><g data-float><path d="M0 170Q31 66 0-74C83-26 83 74 0 170Z" fill="#c0b49e" opacity=".6"/><path d="M-13 204Q33 51 1-74M12 48L39 28M10 91L42 72" stroke="#786f61" stroke-width="1.5" fill="none"/></g></g>
      <path data-ink d="M797 876Q844 809 831 742Q814 700 789 724Q772 753 814 767Q862 775 857 718Q835 657 820 663" stroke="#aaa38b" fill="none" stroke-width="1.6" opacity=".5"/>
      ${petal(1130,310,-55,.35,'#b7a68f')}${petal(734,593,28,.35,'#b7a68f')}`;
  }

  const builders = { garden, lake, lane, birds, window: windowScene, rooftop, lotus, desert, pages };

  function artwork(setting) {
    return `<svg class="reader-scene-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1000" preserveAspectRatio="xMaxYMid slice" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="scene-sky" x1="0" y1="0" x2=".8" y2="1"><stop stop-color="${setting.bg}"/><stop offset="1" stop-color="${setting.sky}"/></linearGradient>
        <radialGradient id="scene-halo"><stop stop-color="${setting.accent}" stop-opacity=".4"/><stop offset="1" stop-color="${setting.accent}" stop-opacity="0"/></radialGradient>
        <linearGradient id="scene-reflection" x1="0" y1="0" x2="0" y2="1"><stop stop-color="${setting.accent}" stop-opacity=".5"/><stop offset="1" stop-color="${setting.accent}" stop-opacity="0"/></linearGradient>
      </defs><rect width="1200" height="1000" fill="url(#scene-sky)"/>${builders[setting.scene]()}</svg><div class="reader-scene-wash"></div>`;
  }

  class PoemAtmosphere {
    constructor(dialog, mount) { this.dialog = dialog; this.mount = mount; this.context = null; this.timeline = null; this.reduced = false; this.id = null; }

    render(id, reduced = false) {
      this.clear();
      this.id = id;
      this.reduced = reduced;
      const setting = settings[id] || settings.koshish;
      this.dialog.dataset.scene = id;
      this.dialog.style.setProperty('--scene-bg', setting.bg);
      this.dialog.style.setProperty('--scene-accent', setting.accent);
      this.dialog.style.setProperty('--scene-paper', setting.paper);
      this.mount.innerHTML = artwork(setting);
      document.getElementById('reader-scene-name').textContent = setting.name;
      if (!reduced && window.gsap) this.animate();
    }

    animate() {
      const { gsap } = window;
      this.context = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'sine.inOut' } });
        this.timeline = tl;
        const add = (selector, vars, at = 0) => {
          const nodes = [...this.mount.querySelectorAll(selector)];
          if (nodes.length) tl.to(nodes, vars, at);
        };
        add('[data-float]', { y: -16, x: 7, rotation: 7, duration: 6.5, stagger: .7, repeat: -1, yoyo: true, transformOrigin: '50% 50%' });
        add('[data-sway]', { rotation: 3, duration: 7, repeat: -1, yoyo: true, transformOrigin: '50% 100%', stagger: .4 });
        add('[data-breathe]', { opacity: .7, duration: 5.5, repeat: -1, yoyo: true });
        add('[data-glimmer]', { opacity: .2, duration: 4, stagger: .1, repeat: -1, yoyo: true });
        add('[data-glow]', { opacity: .55, duration: 4.8, repeat: -1, yoyo: true });
        add('[data-cloud]', { x: -28, duration: 15, repeat: -1, yoyo: true });
        add('[data-birds]', { x: 26, y: -8, duration: 12, repeat: -1, yoyo: true });
        add('[data-curtain]', { skewX: 2, x: 5, duration: 6, repeat: -1, yoyo: true, transformOrigin: '50% 0%' });
        add('[data-water]', { x: 12, duration: 6, repeat: -1, yoyo: true });
        add('[data-dust]', { x: -23, y: -5, duration: 8.5, repeat: -1, yoyo: true });
        add('[data-rain]', { x: -8, y: 24, duration: 2.5, repeat: -1, yoyo: true, ease: 'none' });
        add('[data-page]', { rotation: 1.5, y: -3, duration: 7, repeat: -1, yoyo: true, transformOrigin: '50% 100%' });
        add('[data-firefly]', { x: 8, y: -18, opacity: .3, duration: 4.5, stagger: .24, repeat: -1, yoyo: true });
        this.mount.querySelectorAll('[data-ripple]').forEach(node => tl.fromTo(node, { scaleX: .65, scaleY: .65, opacity: .3 }, { scaleX: 1.28, scaleY: 1.28, opacity: .08, duration: 6, repeat: -1, yoyo: true, transformOrigin: '50% 50%' }, Number(node.dataset.delay || 0)));
        this.mount.querySelectorAll('[data-ink]').forEach(node => {
          const length = node.getTotalLength();
          tl.fromTo(node, { strokeDasharray: length, strokeDashoffset: length }, { strokeDashoffset: 0, duration: 2.6, ease: 'power1.out' }, 0);
        });
      }, this.mount);
    }

    setMotion(reduced) { if (this.id) this.render(this.id, reduced); }
    pause(paused) { if (this.timeline) this.timeline.paused(paused); }
    clear() {
      this.context?.revert();
      this.context = null;
      this.timeline = null;
      this.id = null;
      this.mount.replaceChildren();
    }
  }
  window.PoemAtmosphere = PoemAtmosphere;
})();
