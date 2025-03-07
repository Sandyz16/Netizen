@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Roboto+Slab:wght@400;700&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Roboto Slab', serif;
    background-color: #111111;
    color: #e0e0e0;
    line-height: 1.6;
    font-size: 18px;
}

#background-animation {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: linear-gradient(135deg, #1a1a1a, #111111);
}

header {
    text-align: center;
    padding: 80px 0;
    background: linear-gradient(135deg, #222222, #111111);
}

h1, h2 {
    font-family: 'Montserrat', sans-serif;
    color: #FFC107;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

h1 {
    font-size: 4rem;
    margin-bottom: 20px;
    letter-spacing: 1px;
}

header p {
    font-size: 1.4rem;
    color: #cccccc;
}

main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 80px 20px;
}

.services-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 40px;
}

.service {
    background-color: #222222;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    padding: 40px;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
}

.service:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(255, 193, 7, 0.2);
}

.service-icon {
    width: 120px;
    height: 120px;
    margin: 0 auto 30px;
    background-color: #333333;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.3s ease;
}

.service:hover .service-icon {
    background-color: #FFC107;
}

.service-icon img {
    width: 60%;
    height: 60%;
    object-fit: contain;
    filter: invert(1);
}

.service h2 {
    font-size: 1.8rem;
    margin-bottom: 15px;
}

.service p {
    color: #cccccc;
    font-size: 1.1rem;
}

footer {
    text-align: center;
    padding: 30px;
    background-color: #111111;
    color: #cccccc;
    font-size: 1.1rem;
}

@media (max-width: 768px) {
    body {
        font-size: 16px;
    }

    h1 {
        font-size: 3rem;
    }

    header p {
        font-size: 1.2rem;
    }

    .services-container {
        grid-template-columns: 1fr;
    }
}
