/**
 * Maranello Luce Design - AI Chat IIFE wrapper
 * Provides the aiChat() factory with default avatar for IIFE consumers.
 */
import type { AIChatOptions, AIChatController } from './ai-chat-dom';
export declare function aiChat(container: HTMLElement, opts?: Partial<AIChatOptions>): AIChatController;
