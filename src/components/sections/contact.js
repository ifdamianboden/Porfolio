import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledContactSection = styled.section`
  max-width: 600px;
  margin: 0 auto 100px;
  text-align: center;

  @media (max-width: 768px) {
    margin: 0 auto 50px;
  }

  .overline {
    display: block;
    margin-bottom: 20px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    font-weight: 400;

    &:before {
      bottom: 0;
      font-size: var(--fz-sm);
    }

    &:after {
      display: none;
    }
  }

  .title {
    font-size: clamp(40px, 5vw, 60px);
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 50px;

    input,
    textarea {
      width: 100%;
      padding: 10px;
      border-radius: 5px;
      border: 1px solid var(--lightest-navy);
      font-size: var(--fz-lg);
      color: var(--lightest-slate);
      background-color: var(--navy);
    }

    button {
      ${({ theme }) => theme.mixins.bigButton};
    }
  }
`;

const Contact = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await fetch('https://formspree.io/f/xeojgajv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Formulario enviado con éxito!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert('Error al enviar el formulario. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      alert('Error al enviar el formulario. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <StyledContactSection id="contact" ref={revealContainer}>
      <h2 className="numbered-heading overline">What’s Next?</h2>

      <h2 className="title">Contacto</h2>

      <p>
        Nuevas oportunidades actualmente, si tienes alguna pregunta o simplemente quieres saludar,
        ¡haré mi mejor esfuerzo para responder!
      </p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Tu nombre"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Tu correo electrónico"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Tu mensaje"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <button type="submit">Enviar</button>
      </form>
    </StyledContactSection>
  );
};

export default Contact;
