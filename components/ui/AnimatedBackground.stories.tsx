import type { Meta, StoryObj } from '@storybook/nextjs';
import AnimatedBackground from './AnimatedBackground';

const meta = {
  title: 'UI/AnimatedBackground',
  component: AnimatedBackground,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'light',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AnimatedBackground>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  render: () => (
    <div style={{ position: 'relative', height: '100vh', backgroundColor: '#ffffff' }}>
      <AnimatedBackground />
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          padding: '40px',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '600px' }}>
          <h1 style={{ fontSize: '48px', marginBottom: '16px', color: '#333' }}>
            Animated Background
          </h1>
          <p style={{ fontSize: '18px', color: '#666', lineHeight: 1.6 }}>
            This background features floating orbs with Bitcoin orange color and a subtle grid
            pattern. The orbs move gently to create visual interest without being distracting.
          </p>
        </div>
      </div>
    </div>
  ),
};

// Story with dark content
export const WithDarkContent: Story = {
  render: () => (
    <div style={{ position: 'relative', height: '100vh', backgroundColor: '#1a1a1a' }}>
      <AnimatedBackground />
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          padding: '40px',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '600px' }}>
          <h1 style={{ fontSize: '48px', marginBottom: '16px', color: '#ffffff' }}>
            Dark Theme Example
          </h1>
          <p style={{ fontSize: '18px', color: '#cccccc', lineHeight: 1.6 }}>
            The animated background adapts well to dark themes, providing subtle movement without
            overwhelming the content.
          </p>
        </div>
      </div>
    </div>
  ),
};

// Story with form overlay
export const WithFormOverlay: Story = {
  render: () => (
    <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <AnimatedBackground />
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '40px',
        }}
      >
        <div
          style={{
            backgroundColor: 'white',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
            width: '100%',
            maxWidth: '400px',
          }}
        >
          <h2 style={{ fontSize: '24px', marginBottom: '24px', color: '#333' }}>
            Sign Up for Updates
          </h2>
          <form>
            <div style={{ marginBottom: '16px' }}>
              <label
                style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}
              >
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '6px',
                  fontSize: '16px',
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#F7931A',
                color: '#212121',
                border: 'none',
                borderRadius: '6px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  ),
};

// Story showing responsive behavior
export const ResponsiveBehavior: Story = {
  render: () => (
    <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#ffffff' }}>
      <AnimatedBackground />
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '40px',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '32px', marginBottom: '24px', color: '#333' }}>
            Responsive Background
          </h2>
          <p style={{ fontSize: '16px', color: '#666', lineHeight: 1.6, marginBottom: '24px' }}>
            The animated background is designed to work seamlessly across all screen sizes. Try
            resizing your browser window to see how the orbs and grid pattern adapt.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px',
              marginTop: '40px',
            }}
          >
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                style={{
                  backgroundColor: 'white',
                  padding: '24px',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                }}
              >
                <h3 style={{ fontSize: '18px', marginBottom: '8px', color: '#333' }}>
                  Feature {item}
                </h3>
                <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
                  The background remains subtle and performant even with complex layouts.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
};

// Story showing performance with many elements
export const WithManyElements: Story = {
  name: 'Performance Test',
  render: () => (
    <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#ffffff' }}>
      <AnimatedBackground />
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '40px',
        }}
      >
        <h2 style={{ fontSize: '32px', marginBottom: '24px', color: '#333', textAlign: 'center' }}>
          Performance with Many Elements
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: '10px',
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
          {Array.from({ length: 50 }, (_, i) => (
            <div
              key={i}
              style={{
                backgroundColor: i % 2 === 0 ? '#F7931A' : '#333',
                color: i % 2 === 0 ? '#212121' : 'white',
                padding: '20px',
                borderRadius: '4px',
                textAlign: 'center',
                fontSize: '14px',
              }}
            >
              Item {i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};
