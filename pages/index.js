import { useState, useRef, useEffect } from 'react';
import { 
  Container, 
  Title, 
  Button, 
  Text, 
  Tooltip, 
  Group, 
  Flex,
  Box
} from '@mantine/core';

const COLORS = {
  FG: [
    { code: 30, color: '#4f545c', name: 'Dark Gray' },
    { code: 31, color: '#dc322f', name: 'Red' },
    { code: 32, color: '#859900', name: 'Green' },
    { code: 33, color: '#b58900', name: 'Gold' },
    { code: 34, color: '#268bd2', name: 'Blue' },
    { code: 35, color: '#d33682', name: 'Pink' },
    { code: 36, color: '#2aa198', name: 'Teal' },
    { code: 37, color: '#ffffff', name: 'White' },
  ],
  BG: [
    { code: 40, color: '#002b36', name: 'Dark Blue' },
    { code: 41, color: '#cb4b16', name: 'Brown' },
    { code: 42, color: '#586e75', name: 'Gray' },
    { code: 43, color: '#657b83', name: 'Slate' },
    { code: 44, color: '#839496', name: 'Light Gray' },
    { code: 45, color: '#6c71c4', name: 'Purple' },
    { code: 46, color: '#93a1a1', name: 'Silver' },
    { code: 47, color: '#fdf6e3', name: 'Cream' },
  ]
};

export default function Home() {
  const editorRef = useRef(null);
  const [copyCount, setCopyCount] = useState(0);
  const [showCopied, setShowCopied] = useState(false);

  const applyStyle = (code) => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const content = range.extractContents();
    
    const span = document.createElement('span');
    span.className = `ansi-${code}`;
    span.appendChild(content);
    
    range.insertNode(span);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  const resetStyles = () => {
    if (!editorRef.current) return;
    editorRef.current.innerHTML = editorRef.current.textContent;
  };

  const convertToANSI = (nodes) => {
    let ansiText = '';
    nodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        ansiText += node.textContent;
      } else if (node.nodeName === 'SPAN') {
        const code = parseInt(node.className.replace('ansi-', ''));
        ansiText += `\x1b[${code}m${convertToANSI(node.childNodes)}\x1b[0m`;
      } else if (node.nodeName === 'BR') {
        ansiText += '\n';
      }
    });
    return ansiText;
  };

  const copyText = async () => {
    const content = editorRef.current;
    const ansiContent = `\`\`\`ansi\n${convertToANSI(content.childNodes)}\n\`\`\``;
    
    try {
      await navigator.clipboard.writeText(ansiContent);
      setCopyCount(prev => prev + 1);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 3000);
    } catch (err) {
      alert('Failed to copy text');
    }
  };

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = 
        'Welcome to&nbsp;<span class="ansi-33">Prateek</span>\'s ' + 
        '<span class="ansi-45"><span class="ansi-37">Discord</span></span>&nbsp;' +
        '<span class="ansi-31">C</span><span class="ansi-32">o</span>' +
        '<span class="ansi-33">l</span><span class="ansi-34">o</span>' +
        '<span class="ansi-35">r</span><span class="ansi-36">e</span>' +
        '<span class="ansi-37">d</span>&nbsp;Text Generator!';
    }
  }, []);

  return (
    <Container fluid style={{ 
      backgroundColor: '#36393F',
      minHeight: '100vh',
      padding: '40px 0',
      margin: 0
    }}>
      <Title order={1} style={{ 
        color: 'white', 
        textAlign: 'center', 
        marginBottom: 40,
        fontSize: '2.5rem'
      }}>
        Prateek's Discord <span style={{ color: '#5865F2' }}>Colored</span> Text Generator
      </Title>

      <Container size="md" style={{ 
        maxWidth: 600, 
        margin: '0 auto',
        padding: 0
      }}>
        <Text weight={700} mb="xl" style={{ color: 'white', textAlign: 'center', fontSize: '1.8rem' }}>
          Create your text
        </Text>

        <Group position="center" spacing="md" mb="xl">
          <Button variant="outline" onClick={resetStyles}>Reset All</Button>
          <Button variant="outline" onClick={() => applyStyle(1)}>Bold</Button>
          <Button variant="outline" onClick={() => applyStyle(4)}>Line</Button>
        </Group>

        <Flex align="center" gap="md" mb="xl">
          <Text size="lg" weight={500} style={{ color: 'white', width: 30, textAlign: 'left' }}>
            FG
          </Text>
          <Group spacing={5}>
            {COLORS.FG.map(({ code, color, name }) => (
              <Tooltip label={name} key={code}>
                <Button 
                  style={{ 
                    backgroundColor: color, 
                    width: 40, 
                    height: 40, 
                    padding: 0
                  }}
                  onClick={() => applyStyle(code)}
                />
              </Tooltip>
            ))}
          </Group>
        </Flex>

        <Flex align="center" gap="md" mb="xl">
          <Text size="lg" weight={500} style={{ color: 'white', width: 30, textAlign: 'left' }}>
            BG
          </Text>
          <Group spacing={5}>
            {COLORS.BG.map(({ code, color, name }) => (
              <Tooltip label={name} key={code}>
                <Button 
                  style={{ 
                    backgroundColor: color, 
                    width: 40, 
                    height: 40, 
                    padding: 0
                  }}
                  onClick={() => applyStyle(code)}
                />
              </Tooltip>
            ))}
          </Group>
        </Flex>

        <Box 
          ref={editorRef}
          contentEditable
          style={{
            minHeight: 200,
            width: 600,
            margin: '0 auto 40px auto',
            border: '1px solid #202225',
            borderRadius: 4,
            padding: 16,
            backgroundColor: '#2F3136',
            color: '#B9BBBE',
            whiteSpace: 'pre-wrap'
          }}
        />

        <Flex direction="column" align="center" gap="md">
        <Box style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
  <Button 
    variant="filled" 
    onClick={copyText}
    style={{ 
      width: 250,
      backgroundColor: showCopied ? '#43b581' : '#4f545c', 
      color: 'white', 
      borderRadius: '4px',
      fontWeight: 500,
      height: 40,
      transition: 'background-color 0.2s ease',
    }}
    onMouseEnter={(e) => {
      if (!showCopied) e.currentTarget.style.backgroundColor = '#5a5d63';
    }}
    onMouseLeave={(e) => {
      if (!showCopied) e.currentTarget.style.backgroundColor = '#4f545c';
    }}
  >
    {showCopied ? 'Copied!' : 'Copy text as Discord formatted'}
  </Button>
</Box>


          <Box mt={40}>
            <Text size="sm" style={{ color: '#b9bbbe', textAlign: 'center' }}>
              This is an unofficial tool, not affiliated with Discord.
            </Text>
          </Box>
        </Flex>
      </Container>
    </Container>
  );
}