import React, { useState } from 'react';
import './Faq.css';

const FAQ_DATA = [
  { id: 1, title: "Оплата", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in velit luctus, ullamcorper lectus vel, bibendum sem. Proin eu lorem at justo feugiat pellentesque. Praesent ullamcorper eu turpis ac consectetur. Duis vehicula velit porta imperdiet venenatis. Suspendisse eget nibh posuere, mollis erat sit amet, semper urna. Aenean molestie, purus nec ornare ornare, purus nulla viverra libero, nec convallis risus nulla quis tellus. Sed molestie tempor mi non luctus. Etiam cursus feugiat erat ut tristique. Curabitur ullamcorper vel orci in bibendum. Donec tempor luctus enim vitae ornare. Curabitur vel orci vel odio efficitur aliquam hendrerit non nisi. Aliquam eros nisi, euismod a diam vitae, rhoncus suscipit risus. Nam congue tellus id elementum aliquam. Proin nec lacinia risus." },
  { id: 2, title: "Доставка", content: "Cras imperdiet, dui sed pretium dictum, diam leo gravida purus, sed bibendum tortor ante ac sapien. Sed lorem purus, tincidunt sed sapien eu, laoreet tempor metus." }
];

const Faq = () => {
  const [activeFaqId, setActiveFaqId] = useState(FAQ_DATA[0].id);

  const getActiveFaqContent = () => {
    const activeFaq = FAQ_DATA.find(faq => faq.id === activeFaqId);
    return activeFaq ? activeFaq.content : 'No content available.';
  };

  return (
    <div className="faq-layout">
      <div className="faq-sidebar">
        <h3>Запитання/відповіді</h3>
        {FAQ_DATA.map(faq => (
          <button
            key={faq.id}
            className={`faq-item ${faq.id === activeFaqId ? 'active' : ''}`}
            onClick={() => setActiveFaqId(faq.id)}
          >
            {faq.title}
          </button>
        ))}
      </div>
      <div className="faq-content">
        <p>{getActiveFaqContent()}</p>
      </div>
    </div>
  );
};

export default Faq;
