
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      expenses: {
        Row: {
          amount: number
          category: string | null
          created_at: string | null
          date: string
          description: string
          id: string
          reference: string | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          category?: string | null
          created_at?: string | null
          date: string
          description: string
          id?: string
          reference?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          category?: string | null
          created_at?: string | null
          date?: string
          description?: string
          id?: string
          reference?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      layaway_items: {
        Row: {
          created_at: string | null
          id: string
          layaway_id: string | null
          price_at_time: number
          product_id: string | null
          quantity: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          layaway_id?: string | null
          price_at_time: number
          product_id?: string | null
          quantity: number
        }
        Update: {
          created_at?: string | null
          id?: string
          layaway_id?: string | null
          price_at_time?: number
          product_id?: string | null
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "layaway_items_layaway_id_fkey"
            columns: ["layaway_id"]
            isOneToOne: false
            referencedRelation: "layaways"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "layaway_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          }
        ]
      }
      layaways: {
        Row: {
          created_at: string | null
          customer_id: string | null
          deposited_amount: number
          due_date: string | null
          id: string
          notes: string | null
          payment_method: string | null
          remaining_amount: number
          status: string | null
          total_amount: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          customer_id?: string | null
          deposited_amount?: number
          due_date?: string | null
          id?: string
          notes?: string | null
          payment_method?: string | null
          remaining_amount: number
          status?: string | null
          total_amount: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          customer_id?: string | null
          deposited_amount?: number
          due_date?: string | null
          id?: string
          notes?: string | null
          payment_method?: string | null
          remaining_amount?: number
          status?: string | null
          total_amount?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "layaways_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      order_items: {
        Row: {
          created_at: string | null
          id: string
          order_id: string | null
          price_at_time: number
          product_id: string | null
          quantity: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          order_id?: string | null
          price_at_time: number
          product_id?: string | null
          quantity: number
        }
        Update: {
          created_at?: string | null
          id?: string
          order_id?: string | null
          price_at_time?: number
          product_id?: string | null
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          }
        ]
      }
      orders: {
        Row: {
          created_at: string | null
          customer_id: string | null
          id: string
          payment_details: Json | null
          payment_method: string | null
          status: string | null
          total_amount: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          customer_id?: string | null
          id?: string
          payment_details?: Json | null
          payment_method?: string | null
          status?: string | null
          total_amount: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          customer_id?: string | null
          id?: string
          payment_details?: Json | null
          payment_method?: string | null
          status?: string | null
          total_amount?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      products: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          name: string
          price: number
          sku: string | null
          stock: number
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          price: number
          sku?: string | null
          stock?: number
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          price?: number
          sku?: string | null
          stock?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          business_metadata: Json | null
          business_name: string | null
          created_at: string | null
          first_name: string | null
          general_settings: Json | null
          id: string
          is_customer: boolean | null
          last_name: string | null
          phone_number: string | null
          pin: string
          role: string
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          business_metadata?: Json | null
          business_name?: string | null
          created_at?: string | null
          first_name?: string | null
          general_settings?: Json | null
          id: string
          is_customer?: boolean | null
          last_name?: string | null
          phone_number?: string | null
          pin?: string
          role?: string
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          business_metadata?: Json | null
          business_name?: string | null
          created_at?: string | null
          first_name?: string | null
          general_settings?: Json | null
          id?: string
          is_customer?: boolean | null
          last_name?: string | null
          phone_number?: string | null
          pin?: string
          role?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
