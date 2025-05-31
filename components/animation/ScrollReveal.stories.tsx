import type { Meta, StoryObj } from '@storybook/nextjs';
import ScrollReveal from './ScrollReveal';

const meta = {
  title: 'Animation/ScrollReveal',
  component: ScrollReveal,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    threshold: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: 'Percentage of the element that must be visible to trigger',
    },
    triggerOnce: {
      control: 'boolean',
      description: 'Whether the animation triggers only once',
    },
    delay: {
      control: { type: 'select' },
      options: ['none', 'short', 'medium'],
      description: 'Animation delay duration',
    },
    duration: {
      control: { type: 'select' },
      options: ['short', 'medium', 'long'],
      description: 'Animation duration',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof ScrollReveal>;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper component to show the scroll behavior
const ScrollContainer = ({ children }: { children: React.ReactNode }) => (
  <div style={{ height: '200vh', paddingTop: '100vh' }}>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {children}
    </div>
  </div>
);

// Default story with scroll demonstration
export const Default: Story = {
  args: {
    children: (
      <div
        style={{
          padding: '40px',
          backgroundColor: '#F7931A',
          color: 'white',
          borderRadius: '8px',
          fontSize: '18px',
          fontWeight: 'bold',
        }}
      >
        Scroll down to reveal this element
      </div>
    ),
    triggerOnce: true,
    threshold: 0.15,
    delay: 'none',
    duration: 'medium',
  },
  render: (args) => (
    <ScrollContainer>
      <ScrollReveal {...args} />
    </ScrollContainer>
  ),
};

// Story showing delay variations
export const WithDelays: Story = {
  args: {
    children: <div>Placeholder</div>,
  },
  render: () => (
    <ScrollContainer>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
        <ScrollReveal delay="none">
          <div
            style={{
              padding: '20px',
              backgroundColor: '#333',
              color: 'white',
              borderRadius: '4px',
            }}
          >
            No Delay
          </div>
        </ScrollReveal>
        <ScrollReveal delay="short">
          <div
            style={{
              padding: '20px',
              backgroundColor: '#333',
              color: 'white',
              borderRadius: '4px',
            }}
          >
            Short Delay (100ms)
          </div>
        </ScrollReveal>
        <ScrollReveal delay="medium">
          <div
            style={{
              padding: '20px',
              backgroundColor: '#333',
              color: 'white',
              borderRadius: '4px',
            }}
          >
            Medium Delay (300ms)
          </div>
        </ScrollReveal>
      </div>
    </ScrollContainer>
  ),
};

// Story showing duration variations
export const WithDurations: Story = {
  args: {
    children: <div>Placeholder</div>,
  },
  render: () => (
    <ScrollContainer>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
        <ScrollReveal duration="short">
          <div
            style={{
              padding: '20px',
              backgroundColor: '#F7931A',
              color: 'white',
              borderRadius: '4px',
            }}
          >
            Short Duration (300ms)
          </div>
        </ScrollReveal>
        <ScrollReveal duration="medium">
          <div
            style={{
              padding: '20px',
              backgroundColor: '#F7931A',
              color: 'white',
              borderRadius: '4px',
            }}
          >
            Medium Duration (500ms)
          </div>
        </ScrollReveal>
        <ScrollReveal duration="long">
          <div
            style={{
              padding: '20px',
              backgroundColor: '#F7931A',
              color: 'white',
              borderRadius: '4px',
            }}
          >
            Long Duration (700ms)
          </div>
        </ScrollReveal>
      </div>
    </ScrollContainer>
  ),
};

// Story with complex content
export const WithComplexContent: Story = {
  args: {
    children: (
      <div
        style={{
          padding: '40px',
          backgroundColor: 'white',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          borderRadius: '12px',
          maxWidth: '400px',
        }}
      >
        <h3 style={{ margin: '0 0 16px 0', color: '#333' }}>Feature Card</h3>
        <p style={{ margin: '0', color: '#666', lineHeight: 1.6 }}>
          This demonstrates how ScrollReveal works with more complex content like cards or sections.
        </p>
      </div>
    ),
    delay: 'short',
    duration: 'medium',
  },
  render: (args) => (
    <ScrollContainer>
      <ScrollReveal {...args} />
    </ScrollContainer>
  ),
};

// Story without trigger once (repeating animation)
export const RepeatingAnimation: Story = {
  args: {
    children: (
      <div
        style={{
          padding: '40px',
          backgroundColor: '#0066FF',
          color: 'white',
          borderRadius: '8px',
          fontSize: '16px',
        }}
      >
        This animation triggers every time you scroll past
      </div>
    ),
    triggerOnce: false,
    threshold: 0.5,
  },
  render: (args) => (
    <ScrollContainer>
      <ScrollReveal {...args} />
    </ScrollContainer>
  ),
};

// Story with custom threshold
export const CustomThreshold: Story = {
  args: {
    children: (
      <div
        style={{
          height: '300px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
          backgroundColor: '#28A745',
          color: 'white',
          borderRadius: '8px',
          fontSize: '16px',
          textAlign: 'center',
        }}
      >
        This tall element triggers when 50% is visible
      </div>
    ),
    threshold: 0.5,
    duration: 'long',
  },
  render: (args) => (
    <ScrollContainer>
      <ScrollReveal {...args} />
    </ScrollContainer>
  ),
};
